"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { StoredCareer } from "@/lib/careerDatabase";

type Trait = "analytical" | "social" | "creative" | "practical" | "leadership" | "science" | "language" | "math";
type Scores = Partial<Record<Trait, number>>;
type Option = { label: string; detail?: string; scores: Scores };
type Question = { title: string; prompt: string; scene: string; options: Option[] };

const questions: Question[] = [
  { title: "A tricky school project", prompt: "Your group gets a big project. What would you do first?", scene: "🗺️", options: [
    { label: "Make a list and figure it out step by step", scores: { analytical: 3, math: 1 } },
    { label: "Ask everyone for ideas and help the group agree", scores: { social: 3, language: 1 } },
    { label: "Think of a fun idea that no one else has tried", scores: { creative: 3, analytical: 1 } },
    { label: "Start building something and improve it as I go", scores: { practical: 3, analytical: 1 } },
  ]},
  { title: "Classes you enjoy", prompt: "Which kind of class usually feels best to you?", scene: "🎒", options: [
    { label: "Math or computer class", detail: "I like puzzles, numbers, or coding", scores: { math: 4, analytical: 2 } },
    { label: "Science or health class", detail: "I like learning how nature and bodies work", scores: { science: 4, analytical: 1 } },
    { label: "English, history, or social studies", detail: "I like stories, people, and big ideas", scores: { language: 4, social: 1 } },
    { label: "Art, design, shop, or hands-on class", detail: "I like making things I can see or use", scores: { creative: 2, practical: 2 } },
  ]},
  { title: "Math and science", prompt: "Right now, how are math and science going for you?", scene: "🧪", options: [
    { label: "I do pretty well in both", scores: { math: 3, science: 3, analytical: 1 } },
    { label: "Math is easier for me", scores: { math: 3, analytical: 2 } },
    { label: "Science is easier for me", scores: { science: 3, practical: 1 } },
    { label: "They are not my favorites—and that is okay", detail: "I may shine more in words, people, or creative projects", scores: { language: 2, social: 2, creative: 1 } },
  ]},
  { title: "Working with others", prompt: "In a group activity, which part sounds most like you?", scene: "🤝", options: [
    { label: "I help people and make sure no one is left out", scores: { social: 4, language: 1 } },
    { label: "I join the discussion, then focus on my own part", scores: { social: 2, analytical: 2 } },
    { label: "I like getting a part I can quietly finish myself", scores: { analytical: 3, practical: 1 } },
    { label: "I organize the group and keep everyone moving", scores: { leadership: 4, social: 2 } },
  ]},
  { title: "A proud moment", prompt: "Which achievement would make you feel most proud?", scene: "⭐", options: [
    { label: "I solved a puzzle that seemed impossible", scores: { analytical: 3, math: 2 } },
    { label: "I helped someone feel better or learn something", scores: { social: 3, science: 2 } },
    { label: "I built or fixed something that really works", scores: { practical: 3, creative: 2 } },
    { label: "I made a story, poster, or video people loved", scores: { language: 3, creative: 2, social: 1 } },
  ]},
  { title: "Imagine your future", prompt: "Which place looks most interesting to spend a day?", scene: "🔭", options: [
    { label: "A cool office, design studio, or computer setup", scores: { analytical: 2, creative: 1 } },
    { label: "A hospital, clinic, or place that helps people", scores: { science: 2, social: 3 } },
    { label: "A school, library, or community center", scores: { social: 3, language: 2 } },
    { label: "A workshop, building site, or a new place each day", scores: { practical: 4 } },
  ]},
  { title: "When people count on you", prompt: "A club needs your help. Which job would you pick?", scene: "🚀", options: [
    { label: "Check the facts and make sure the plan makes sense", scores: { analytical: 3, math: 1 } },
    { label: "Look after people and help when something goes wrong", scores: { social: 3, science: 2 } },
    { label: "Choose a direction and get everyone excited", scores: { leadership: 4, language: 1 } },
    { label: "Set things up and make sure everything works safely", scores: { practical: 3, analytical: 1 } },
  ]},
  { title: "A free afternoon", prompt: "You can try one activity just for fun. Which do you choose?", scene: "🌈", options: [
    { label: "Try an app, money game, robot, or brain teaser", scores: { analytical: 3, math: 2 } },
    { label: "Learn about health, feelings, or how people learn", scores: { science: 2, social: 3 } },
    { label: "Redesign a room, product, outfit, or picture", scores: { creative: 4, practical: 1 } },
    { label: "Plan an event, make a pitch, or debate an idea", scores: { leadership: 2, language: 3 } },
  ]},
];

const profiles: Record<string, Scores> = {
  "software-developer": { analytical: 5, math: 3, creative: 2 }, "data-scientist": { analytical: 5, math: 5, science: 2 },
  accountant: { analytical: 4, math: 4, practical: 1 }, pediatrician: { science: 5, social: 5, analytical: 3 },
  psychologist: { social: 5, science: 3, language: 3, analytical: 2 }, "registered-nurse": { social: 5, science: 4, practical: 3 },
  "physical-therapist": { social: 4, science: 4, practical: 4 }, "mechanical-engineer": { practical: 4, math: 4, analytical: 4, creative: 2 },
  electrician: { practical: 5, analytical: 3, math: 2 }, architect: { creative: 5, practical: 3, math: 2, social: 1 },
  "high-school-teacher": { social: 5, language: 4, leadership: 2 }, lawyer: { language: 5, analytical: 4, leadership: 2 },
  "marketing-manager": { creative: 4, leadership: 4, language: 4, social: 3 },
};
const traitLabels: Record<Trait, string> = { analytical: "analysis and problem solving", social: "working with people", creative: "creative thinking", practical: "hands-on work", leadership: "leadership", science: "science", language: "language and communication", math: "math and data" };

export default function CareerQuiz({ careers }: { careers: StoredCareer[] }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Option[]>([]);
  const complete = step >= questions.length;
  const totals = useMemo(() => answers.reduce<Scores>((result, option) => {
    for (const [trait, value] of Object.entries(option.scores) as [Trait, number][]) result[trait] = (result[trait] ?? 0) + value;
    return result;
  }, {}), [answers]);
  const results = useMemo(() => careers.map((career) => {
    const profile = profiles[career.slug] ?? {};
    const score = (Object.entries(profile) as [Trait, number][]).reduce((sum, [trait, weight]) => sum + (totals[trait] ?? 0) * weight, 0);
    const strengths = (Object.keys(profile) as Trait[]).sort((a, b) => (totals[b] ?? 0) * (profile[b] ?? 0) - (totals[a] ?? 0) * (profile[a] ?? 0)).slice(0, 2);
    return { career, score, strengths };
  }).sort((a, b) => b.score - a.score).slice(0, 4), [careers, totals]);

  function choose(option: Option) { setAnswers((current) => [...current, option]); setStep((current) => current + 1); }
  function back() { setAnswers((current) => current.slice(0, -1)); setStep((current) => Math.max(0, current - 1)); }
  function restart() { setAnswers([]); setStep(0); }

  if (complete) return <section className="quizResults">
    <div className="quizCelebration" aria-hidden="true"><span>🎉</span><span>⭐</span><span>🚀</span></div>
    <span className="eyebrow">Your career matches</span><h1>Here are four careers to explore.</h1>
    <p className="quizIntro">There are no right or wrong answers. These ideas are based on what you enjoy today, and your interests can always grow and change.</p>
    <div className="quizResultGrid">{results.map(({ career, strengths }, index) => <article className="quizResult" key={career.slug}>
      <div className="quizRank">{String(index + 1).padStart(2, "0")}</div><h2>{career.title}</h2><p>{career.tagline}</p>
      <div className="quizWhy">Why it may fit: {strengths.map((trait) => traitLabels[trait]).join(" + ")}</div>
      <div className="quizResultActions"><Link href={`/careers/${career.slug}`}>Explore career →</Link>{index < 2 && <Link href="/compare">Compare →</Link>}</div>
    </article>)}</div>
    <button className="quizRestart" type="button" onClick={restart}>Retake the test</button>
  </section>;

  const question = questions[step];
  return <section className="quizPanel">
    <div className="quizProgress"><span>Question {step + 1} of {questions.length}</span><div><i style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div></div>
    <div className="quizQuestionHead">
      <div className="quizScene" key={step} aria-hidden="true"><span className="quizSceneGlow"/><span className="quizSceneCharacter">🧑‍🚀</span><span className="quizSceneItem">{question.scene}</span></div>
      <div><span className="eyebrow">{question.title}</span><h1>{question.prompt}</h1></div>
    </div>
    <div className="quizOptions">{question.options.map((option) => <button type="button" key={option.label} onClick={() => choose(option)}><b>{option.label}</b>{option.detail && <small>{option.detail}</small>}<span>→</span></button>)}</div>
    {step > 0 && <button className="quizBack" type="button" onClick={back}>← Previous question</button>}
  </section>;
}
