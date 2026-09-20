"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Career } from "@/lib/careers";

export default function HeroCareerSearch({ careers }: { careers: Career[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return careers;
    return careers.filter((career) =>
      [career.title, career.tagline, career.education, career.ai, ...career.fit]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [careers, query]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = query.trim().toLowerCase();
    const exact = careers.find((career) => career.title.toLowerCase() === normalized);
    const destination = exact ?? matches[0];
    if (destination) router.push(`/careers/${destination.slug}`);
  }

  return (
    <form className="heroSearch" onSubmit={submit}>
      <span aria-hidden="true">⌕</span>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search careers, skills, or interests…"
        aria-label="Search careers"
        list="hero-career-suggestions"
      />
      <datalist id="hero-career-suggestions">
        {careers.map((career) => <option key={career.slug} value={career.title} />)}
      </datalist>
      <button type="submit" disabled={!matches.length}>Explore</button>
    </form>
  );
}
