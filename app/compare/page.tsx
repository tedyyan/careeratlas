import Nav from "@/components/Nav";
import CareerCompare from "@/components/CareerCompare";
import { getCareers } from "@/lib/careerDatabase";

export default function Compare(){
  const careers = getCareers();
  return <main><Nav/><section className="shell compareHero"><span className="eyebrow">Compare paths</span><h1>Choose two careers. See the difference.</h1><p>Compare the work, education path, knowledge areas, pay, and outlook side by side.</p></section><section className="shell compareWrap"><CareerCompare careers={careers}/><p className="sourceNote">*Pay and outlook snapshots are stored with the career record; see each career page for its official BLS and O*NET sources.</p></section></main>
}
