"use client";

import { useMemo, useState } from "react";
import CareerCard from "./CareerCard";
import type { Career } from "@/lib/careers";

const accents = ["violet", "mint", "amber"];

export default function CareerExplorer({ careers }: { careers: Career[] }) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!normalized) return careers;
    return careers.filter((career) =>
      [career.title, career.tagline, career.education, career.ai, ...career.fit]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [careers, normalized]);

  return (
    <div className="careerExplorer">
      <div className="careerSearch">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search careers, skills, or interests…"
          aria-label="Search careers"
        />
        {query ? (
          <button type="button" onClick={() => setQuery("")} aria-label="Clear search">Clear</button>
        ) : (
          <small>{careers.length} careers</small>
        )}
      </div>
      {results.length ? (
        <>
          {normalized && <p className="searchResultCount">{results.length} {results.length === 1 ? "career" : "careers"} found</p>}
          <div className="cardGrid">
            {results.map((career) => (
              <CareerCard key={career.slug} career={career} accent={accents[careers.indexOf(career) % accents.length]} />
            ))}
          </div>
        </>
      ) : (
        <div className="searchEmpty">
          <b>No careers found for “{query.trim()}”</b>
          <p>Try a role, skill, or interest such as nurse, data, teaching, design, or communication.</p>
          <button type="button" onClick={() => setQuery("")}>Show all careers</button>
        </div>
      )}
    </div>
  );
}
