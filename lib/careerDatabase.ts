import "server-only";

import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";
import { careers as careerSeed, type Career } from "./careers";
import { careerEducation } from "./careerEducation";

export type StoredCareer = Career & {
  overview: string;
  educationPath: string;
  majors: string[];
  knowledgeAreas: string[];
};

const dataDirectory = path.join(process.cwd(), "data");
fs.mkdirSync(dataDirectory, { recursive: true });
const db = new Database(path.join(dataDirectory, "careeratlas.sqlite"));
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS careers (
    slug TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    salary TEXT NOT NULL,
    outlook TEXT NOT NULL,
    education TEXT NOT NULL,
    ai TEXT NOT NULL,
    overview TEXT NOT NULL,
    education_path TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS career_fit (
    career_slug TEXT NOT NULL REFERENCES careers(slug) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    value TEXT NOT NULL,
    PRIMARY KEY (career_slug, position)
  );
  CREATE TABLE IF NOT EXISTS career_majors (
    career_slug TEXT NOT NULL REFERENCES careers(slug) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    value TEXT NOT NULL,
    PRIMARY KEY (career_slug, position)
  );
  CREATE TABLE IF NOT EXISTS career_knowledge_areas (
    career_slug TEXT NOT NULL REFERENCES careers(slug) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    value TEXT NOT NULL,
    PRIMARY KEY (career_slug, position)
  );
`);

const upsertCareer = db.prepare(`
  INSERT INTO careers (slug, title, tagline, salary, outlook, education, ai, overview, education_path)
  VALUES (@slug, @title, @tagline, @salary, @outlook, @education, @ai, @overview, @educationPath)
  ON CONFLICT(slug) DO UPDATE SET
    title=excluded.title, tagline=excluded.tagline, salary=excluded.salary,
    outlook=excluded.outlook, education=excluded.education, ai=excluded.ai,
    overview=excluded.overview, education_path=excluded.education_path,
    updated_at=CURRENT_TIMESTAMP
`);
const clearList = (table: string) => db.prepare(`DELETE FROM ${table} WHERE career_slug = ?`);
const addList = (table: string) => db.prepare(`INSERT INTO ${table} (career_slug, position, value) VALUES (?, ?, ?)`);

db.transaction(() => {
  for (const career of careerSeed) {
    const detail = careerEducation[career.slug];
    upsertCareer.run({ ...career, overview: detail.overview, educationPath: detail.educationPath });
    for (const [table, values] of [
      ["career_fit", career.fit],
      ["career_majors", detail.majors],
      ["career_knowledge_areas", detail.knowledgeAreas],
    ] as const) {
      clearList(table).run(career.slug);
      values.forEach((value, position) => addList(table).run(career.slug, position, value));
    }
  }
})();

type CareerRow = Omit<StoredCareer, "fit" | "majors" | "knowledgeAreas" | "educationPath"> & { education_path: string };
const listValues = db.prepare("SELECT value FROM career_fit WHERE career_slug = ? ORDER BY position");
const listMajors = db.prepare("SELECT value FROM career_majors WHERE career_slug = ? ORDER BY position");
const listKnowledge = db.prepare("SELECT value FROM career_knowledge_areas WHERE career_slug = ? ORDER BY position");

function hydrate(row: CareerRow): StoredCareer {
  const values = (statement: Database.Statement) => (statement.all(row.slug) as { value: string }[]).map((item) => item.value);
  return {
    slug: row.slug, title: row.title, tagline: row.tagline, salary: row.salary,
    outlook: row.outlook, education: row.education, ai: row.ai, overview: row.overview,
    educationPath: row.education_path, fit: values(listValues), majors: values(listMajors),
    knowledgeAreas: values(listKnowledge),
  };
}

export function getCareers(): StoredCareer[] {
  return (db.prepare("SELECT * FROM careers ORDER BY rowid").all() as CareerRow[]).map(hydrate);
}

export function getCareer(slug: string): StoredCareer | undefined {
  const row = db.prepare("SELECT * FROM careers WHERE slug = ?").get(slug) as CareerRow | undefined;
  return row ? hydrate(row) : undefined;
}
