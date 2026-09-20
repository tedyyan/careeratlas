"use client";

import { useState } from "react";
import Link from "next/link";
import type { StoredCareer } from "@/lib/careerDatabase";

export default function CareerCompare({ careers }: { careers: StoredCareer[] }) {
  const [leftSlug, setLeftSlug] = useState(careers[0]?.slug ?? "");
  const [rightSlug, setRightSlug] = useState(careers[1]?.slug ?? "");
  const left = careers.find((career) => career.slug === leftSlug) ?? careers[0];
  const right = careers.find((career) => career.slug === rightSlug) ?? careers[1];
  const rows = [
    ["Career overview", left.overview, right.overview],
    ["Typical education", left.education, right.education],
    ["Education & licensing path", left.educationPath, right.educationPath],
    ["Majors or training programs", left.majors.join(" · "), right.majors.join(" · ")],
    ["Knowledge & coursework areas", left.knowledgeAreas.join(" · "), right.knowledgeAreas.join(" · ")],
    ["Pay snapshot*", left.salary, right.salary],
    ["Outlook snapshot*", left.outlook, right.outlook],
    ["AI direction", left.ai, right.ai],
    ["Great fit if you enjoy", left.fit.join(" · "), right.fit.join(" · ")],
  ];

  return <>
    <div className="comparePickers">
      <label><span>First career</span><select value={leftSlug} onChange={(event) => setLeftSlug(event.target.value)}>{careers.map((career) => <option key={career.slug} value={career.slug} disabled={career.slug === rightSlug}>{career.title}</option>)}</select></label>
      <div className="compareVs">VS</div>
      <label><span>Second career</span><select value={rightSlug} onChange={(event) => setRightSlug(event.target.value)}>{careers.map((career) => <option key={career.slug} value={career.slug} disabled={career.slug === leftSlug}>{career.title}</option>)}</select></label>
    </div>
    <div className="compareTable">
      <div className="compareHead"><div></div>{[left, right].map((career) => <div key={career.slug}><b>{career.title}</b><small>{career.tagline}</small><Link href={`/careers/${career.slug}`}>View career →</Link></div>)}</div>
      {rows.map((row) => <div className="compareRow" key={row[0]}><div>{row[0]}</div><div>{row[1]}</div><div>{row[2]}</div></div>)}
    </div>
  </>;
}
