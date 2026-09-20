"use client";
import { useEffect, useMemo, useState } from "react";
import { softwareDeveloperDay, WorkTask, WorkType } from "@/lib/workdays";
import type { CareerExperienceConfig } from "@/lib/careerExperiences";
import { careerEducation } from "@/lib/careerEducation";
type Decision = "yes" | "skip";
const labels: Record<WorkType, string> = {
  Investigation: "Investigation",
  Communication: "Communication & meetings",
  Planning: "Design & planning",
  "Coding & testing": "Coding & testing",
  Documentation: "Documentation",
};
const careerHighlights: Record<string, string> = {
  "software-developer": "Software developers solve puzzles and build things people can rely on.",
  pediatrician: "Pediatricians notice health problems and help children and families feel safe.",
  psychologist: "Psychologists listen closely and help people understand thoughts, feelings, and behavior.",
  "registered-nurse": "Nurses notice changes quickly, care for patients, and keep the whole team connected.",
  "data-scientist": "Data scientists look for the real story hidden inside numbers.",
  "mechanical-engineer": "Mechanical engineers design, test, and improve how things work in the real world.",
  "high-school-teacher": "Teachers explain ideas, read the room, and help different students learn.",
  lawyer: "Lawyers study the details, explain choices, and speak up for their clients.",
  accountant: "Accountants follow the numbers carefully and help people make trustworthy decisions.",
  electrician: "Electricians solve hands-on problems while making safety the first priority.",
  "physical-therapist": "Physical therapists help people move better and return to everyday activities.",
  "marketing-manager": "Marketing managers understand an audience and turn ideas into messages people notice.",
  architect: "Architects balance creativity with how a building must work for real people.",
};

function careerQuestion(config: CareerExperienceConfig, task: WorkTask) {
  const challenge = task.title.replace(/^The /, "A ").replace(/^Your /, "A ");
  const highlight = careerHighlights[config.slug] ?? `${config.title}s solve real problems and make thoughtful choices.`;
  return `Imagine you're the ${config.title.toLowerCase()} today. ${challenge}. ${highlight} Would you like to take on this challenge?`;
}

const softwareConfig: CareerExperienceConfig = {
  slug: "software-developer", title: "Software Developer", workplace: "AtlasSocial · Feed Engineering",
  headline: "A Day as a Software Developer", intro: "You just joined a fictional Meta-scale social platform. Work through its Jira board, production incidents, code reviews, experiments, and staged launches.",
  dayLabel: "Tuesday · Feed Engineering", dayContext: "Sprint 42 + on-call", guideName: "Alex",
  guideRole: "Software Developer", tasks: softwareDeveloperDay,
  fictionNote: "AtlasSocial is fictional. Its workflow is modeled on common large-company engineering practices.",
  adjacent: ["Product Engineer", "Product Manager", "UX Designer", "AI Application Engineer"],
  peopleIntro: "Watch engineers at three large tech companies, then compare their experiences with trusted career data.",
  videos: [{id:"dpTbHIRreB8",title:"A Day in the Life at Meta",creator:"Life of a SWE"},{id:"oHBFD8cfXho",title:"A Real Day at Google",creator:"Clément Mihailescu"},{id:"W3zU0KjgXwQ",title:"First-person Day at Microsoft",creator:"Jason Goodison"}],
  sources: [{label:"BLS",description:"Pay, outlook & work environment",url:"https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm"},{label:"O*NET",description:"Tasks, skills & work activities",url:"https://www.onetonline.org/link/summary/15-1252.00"}],
};

export default function CareerExperience({ config = softwareConfig }: { config?: CareerExperienceConfig }) {
  const day = config.tasks;
  const education = careerEducation[config.slug];
  const [started, setStarted] = useState(false),
    [index, setIndex] = useState(0),
    [walkthrough, setWalkthrough] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});
  const openBoard = () => {
    setStarted(true);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document
          .getElementById("today-board")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };
  const task = day[index], finished = index >= day.length;
  const decide = (value: Decision) => {
    setDecisions((d) => ({ ...d, [task.id]: value }));
    value === "yes" ? setWalkthrough(true) : setIndex((i) => i + 1);
  };
  const totals = useMemo(
    () =>
      day.reduce(
        (a, t) => {
          if (decisions[t.id] === "yes")
            a[t.workType] = (a[t.workType] || 0) + t.duration;
          return a;
        },
        {} as Record<string, number>,
      ),
    [decisions, day],
  );
  const accepted = day.filter(
    (t) => decisions[t.id] === "yes",
  );
  const restart = () => {
    setDecisions({});
    setIndex(0);
    setWalkthrough(false);
    setStarted(true);
  };
  const taskNarration = task ? careerQuestion(config, task) : "Voice is on.";
  const toggleVoice = () => {
    const next = !soundOn;
    setSoundOn(next);
    if (next) speak(taskNarration);
    else window.speechSynthesis?.cancel();
  };
  return (
    <>
      <section className="careerHero shell v2Hero">
        <div className="careerHeroCopy">
          <a href="/" className="backLink">
            ← Explore careers
          </a>
          <div className="pill">{config.workplace}</div>
          <h1>{config.headline}</h1>
          <p>{config.intro}</p>
          <div className="heroActions">
            <button
              className="button primary noBorder"
              onClick={openBoard}
            >
              Open today’s board <span>→</span>
            </button>
            <span className="dayLength">
              {day.length} real-world moments · about 12
              minutes
            </span>
          </div>
          <p className="fictionNote">
            {config.fictionNote}
          </p>
        </div>
        <div className="dayMap">
          <div className="mapHeader">
            <span>{config.dayLabel}</span>
            <b>{config.dayContext}</b>
          </div>
          {day.map((t, i) => (
            <div className="mapStop" key={t.id}>
              <time>{t.time}</time>
              <i className={started && i <= index ? "lit" : ""} />
              <span>
                <b>{t.ticket}</b> {t.title}
              </span>
            </div>
          ))}
        </div>
      </section>
      {!started && (
        <section className="preflight">
          <div className="shell preflightInner">
            <span className="eyebrow light">How it works</span>
            <h2>You choose the work—not the “correct” answer.</h2>
            <div className="threeSteps">
              <div>
                <b>01</b>
                <h3>Meet the moment</h3>
                <p>See the situation, people, stakes, and why it matters.</p>
              </div>
              <div>
                <b>02</b>
                <h3>Take it or skip it</h3>
                <p>
                  Both are useful signals. There are no points or aptitude
                  scores.
                </p>
              </div>
              <div>
                <b>03</b>
                <h3>See the real process</h3>
                <p>
                  If you accept, follow the professional workflow and time
                  spent.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      {started && !finished && (
        <section
          id="today-board"
          className={`workday ${task.id === "night-oncall" ? "nightShift" : ""}`}
        >
          <div className="shell workdayShell">
            <div className="clockRail">
              <div className="clockNow">{task.time}</div>
              <div className="progressLine">
                <span
                  style={{
                    width: `${((index + 1) / day.length) * 100}%`,
                  }}
                />
              </div>
              <small>
                Moment {index + 1} of {day.length}
              </small>
              <button
                className={`voiceToggle ${soundOn ? "on" : ""}`}
                onClick={toggleVoice}
              >
                {soundOn ? "🔊 Voice on" : "🔈 Enable voice"}
              </button>
            </div>
            {!walkthrough ? (
              <TaskChoice task={task} onChoice={decide} soundOn={soundOn} config={config} />
            ) : (
              <ProcessWalkthrough
                task={task}
                soundOn={soundOn}
                config={config}
                onNext={() => {
                  window.speechSynthesis?.cancel();
                  setWalkthrough(false);
                  setIndex((i) => i + 1);
                }}
              />
            )}
          </div>
        </section>
      )}
      {started && finished && (
        <section className="summarySection">
          <div className="shell">
            <span className="eyebrow">Your day as a {config.title.toLowerCase()}</span>
            <h2>You explored the work. Here’s what stood out.</h2>
            <div className="summaryGrid">
              <div className="summaryCard">
                <div className="summaryCount">
                  <b>{accepted.length}</b>
                  <span>tasks accepted</span>
                  <small>
                    {day.length - accepted.length} skipped,
                    without judgment
                  </small>
                </div>
                <div className="allocation">
                  <h3>Your accepted-work mix</h3>
                  {Object.entries(labels).map(([key, label]) => {
                    const val = totals[key] || 0,
                      max = Math.max(...Object.values(totals), 1);
                    return (
                      <div className="barRow" key={key}>
                        <span>{label}</span>
                        <i>
                          <em style={{ width: `${(val / max) * 100}%` }} />
                        </i>
                        <b>{val}m</b>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="reflectionCard">
                <span>Reflection, not a verdict</span>
                <h3>
                  {accepted.length
                    ? `You seemed most open to ${labels[accepted.slice().sort((a, b) => (totals[b.workType] || 0) - (totals[a.workType] || 0))[0].workType].toLowerCase()}.`
                    : "You skipped every task—and that’s useful information."}
                </h3>
                <p>
                  {accepted.length
                    ? `Notice whether you liked the problem itself, the people involved, or seeing a concrete result. Another ${config.title.toLowerCase()} role may have a different mix.`
                    : `${config.title} may not match what you want from a workday. Exploring contrast is the point.`}
                </p>
                <div className="adjacent">
                  <small>You may want to explore</small>
                  {config.adjacent.map((role) => <span key={role}>{role}</span>)}
                </div>
                <button className="button ghost" onClick={restart}>
                  Replay the day
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="shell section realPeople">
        {education && (
          <div className="educationSection">
            <div className="sectionHead">
              <div>
                <span className="eyebrow">College & preparation</span>
                <h2>What should you study?</h2>
              </div>
              <p>{education.overview}</p>
            </div>
            <div className="educationGrid">
              <article className="educationCard pathCard">
                <span>Typical education path · BLS</span>
                <p>{education.educationPath}</p>
              </article>
              <article className="educationCard">
                <span>College majors / programs · BLS</span>
                <div className="educationTags">{education.majors.map((item) => <b key={item}>{item}</b>)}</div>
              </article>
              <article className="educationCard">
                <span>Knowledge & coursework areas · O*NET</span>
                <div className="educationTags">{education.knowledgeAreas.map((item) => <b key={item}>{item}</b>)}</div>
                <small>O*NET publishes knowledge areas, not a required university course list.</small>
              </article>
            </div>
            <div className="educationSources">
              <span>Official source material only</span>
              {config.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={`education-${source.url}`}><b>{source.label}</b> <em>↗</em></a>)}
            </div>
          </div>
        )}
        <div className="sectionHead">
          <div>
            <span className="eyebrow">Real people, real careers</span>
            <h2>See how the job looks in real life.</h2>
          </div>
          <p>
            {config.peopleIntro}
          </p>
        </div>
        <div className="peopleGrid">
          {config.videos.map((video, i) => (
            <article
              className={`videoCard ${i === 0 ? "featuredVideo" : ""}`}
              key={video.id}
            >
              <div className="youtubeFrame">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="videoCaption">
                <b>{video.title}</b>
                <small>{video.creator} · YouTube</small>
              </div>
            </article>
          ))}
        </div>
        <div className="careerSources">
          <span>Explore the official career data</span>
          {config.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><b>{source.label}</b> {source.description} <em>↗</em></a>)}
        </div>
      </section>
    </>
  );
}
function Guide({ config, small = false }: { config: CareerExperienceConfig; small?: boolean }) {
  return (
    <div className={small ? "guide guideSmall" : "guide"}>
      <div className="guideGlow" />
      <img
        src="/careeratlas-guide-v1.png"
        alt={`${config.guideName}, your ${config.guideRole.toLowerCase()} guide`}
      />
      <div className="guideName">
        <b>{config.guideName}</b>
        <span>{config.guideRole} · your guide</span>
      </div>
    </div>
  );
}
function speak(text: string) {
  if (!window.speechSynthesis) return;
  const engine = window.speechSynthesis;
  engine.cancel();
  engine.resume();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.96;
  utterance.pitch = 0.92;
  utterance.volume = 1;
  const voices = engine.getVoices();
  utterance.voice =
    voices.find((v) =>
      /Daniel|Alex|Aaron|Arthur|Guy|Google US English/i.test(v.name),
    ) ||
    voices.find((v) => v.lang.startsWith("en")) ||
    null;
  engine.speak(utterance);
}
function TaskChoice({
  task,
  onChoice,
  soundOn,
  config,
}: {
  task: WorkTask;
  onChoice: (d: Decision) => void;
  soundOn: boolean;
  config: CareerExperienceConfig;
}) {
  const narration = careerQuestion(config, task);
  useEffect(() => {
    if (soundOn) speak(narration);
    else window.speechSynthesis?.cancel();
    return () => window.speechSynthesis?.cancel();
  }, [task.id, soundOn, narration]);
  return (
    <div className="gameStage">
      <div className="officeScene">
        <div className="officeTop">
          <span>{config.workplace.toUpperCase()}</span>
          <b>
            ● {task.id === "night-oncall" ? "Night on-call" : "Live workday"}
          </b>
        </div>
        <Guide config={config} />
        <div className="dialogue">
          <div className="ticketStrip">
            <b>{task.ticket}</b>
            <span>{task.priority}</span>
            <span>{task.system}</span>
          </div>
          <div className="speaker">
            <b>{config.guideName}</b>
            <span>{task.channel}</span>
          </div>
          <button
            type="button"
            className="dialoguePlay"
            aria-label={`Play ${config.guideName}'s question`}
            onClick={() => speak(narration)}
          >
            ▶ Read aloud
          </button>
          <h2>{task.title}</h2>
          <p className="situation">“{narration}”</p>
          <div className="why">
            <b>Why it matters</b>
            <p>{task.why}</p>
          </div>
        </div>
        <div className="scenePeople">
          <small>In this scene</small>
          {task.people.map((p, i) => (
            <div key={p}>
              <i className={`avatar avatar${i}`}>
                {p
                  .split(" ")
                  .map((x) => x[0])
                  .join("")
                  .slice(0, 2)}
              </i>
              <span>{p}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="decisionPanel gameDecision">
        <span>{config.guideName} asks:</span>
        <h3>Want to take this one?</h3>
        <button
          type="button"
          className="questionAudio"
          onClick={() => speak(narration)}
        >
          <span>▶</span>
          <b>Play question</b>
        </button>
        <div className="miniTicket">
          <b>{task.ticket}</b>
          <span>{task.priority}</span>
          <small>{task.system}</small>
        </div>
        <button className="take" onClick={() => onChoice("yes")}>
          <b>YES, I&apos;M IN</b>
          <small>I&apos;ll take this one</small>
          <em>→</em>
        </button>
        <button className="skip" onClick={() => onChoice("skip")}>
          <b>NOT THIS ONE</b>
          <small>Let&apos;s see the next task</small>
          <em>→</em>
        </button>
        <p>No right answer. {config.guideName} will move the workday forward if you pass.</p>
      </div>
    </div>
  );
}
function ProcessWalkthrough({
  task,
  onNext,
  soundOn,
  config,
}: {
  task: WorkTask;
  onNext: () => void;
  soundOn: boolean;
  config: CareerExperienceConfig;
}) {
  const [active, setActive] = useState(0);
  const done = active >= task.steps.length;
  const openStep = (i: number) => {
    if (i !== active) return;
    const s = task.steps[i];
    if (soundOn) speak(`Step ${i + 1}. ${s.label}. ${s.detail}`);
    setActive(i + 1);
  };
  useEffect(() => {
    if (done && soundOn) speak(`Mission result. ${task.outcome}`);
  }, [done, soundOn, task.outcome]);
  const replay = () => {
    window.speechSynthesis?.cancel();
    setActive(0);
  };
  return (
    <div className="processStage gameProcess">
      <div className="processGuide">
        <Guide config={config} small />
        <div className="processSpeech">
          <b>
            {done
              ? "That’s the complete workflow."
              : `Click step ${active + 1} to continue`}
          </b>
          <span>
            {soundOn
              ? `Each click unlocks ${config.guideName}’s narration and the next step`
              : "Complete every step in order to unlock Continue"}
          </span>
        </div>
      </div>
      <div className="processHead">
        <div>
          <span className="taskType">How the work unfolds</span>
          <h2>{task.title}</h2>
        </div>
        <div className="totalTime">
          <b>{task.duration}</b>
          <span>minutes total</span>
        </div>
      </div>
      <div className="stepProgress">
        <span
          style={{
            width: `${Math.min((active / task.steps.length) * 100, 100)}%`,
          }}
        />
      </div>
      <div className="processFlow">
        {task.steps.map((s, i) => (
          <button
            type="button"
            disabled={i !== active}
            onClick={() => openStep(i)}
            className={`processStep ${i < active ? "complete" : ""} ${i === active ? "active" : ""}`}
            key={s.label}
          >
            <div className="stepNo">
              {i < active ? "✓" : String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <div className="stepTitle">
                <b>{s.label}</b>
                <span>{s.minutes} min</span>
              </div>
              <p>{s.detail}</p>
              {i === active && (
                <small className="stepPrompt">Click to complete →</small>
              )}
            </div>
          </button>
        ))}
      </div>
      <div className={`outcome ${done ? "revealed" : ""}`}>
        <span>Mission result</span>
        <p>{task.outcome}</p>
      </div>
      <div className="processActions">
        <button className="replayFlow" onClick={replay}>
          ↻ Start steps again
        </button>
        <button
          className="button primary noBorder nextTask"
          disabled={!done}
          onClick={onNext}
        >
          {done ? `Continue with ${config.guideName}` : "Complete all steps"} <span>→</span>
        </button>
      </div>
    </div>
  );
}
