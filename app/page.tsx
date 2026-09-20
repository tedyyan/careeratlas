import Nav from "@/components/Nav";
import CareerExplorer from "@/components/CareerExplorer";
import HomeInteractive from "@/components/HomeInteractive";
import HeroCareerSearch from "@/components/HeroCareerSearch";
import { getCareers } from "@/lib/careerDatabase";
import Link from "next/link";

export default function Home() {
  const careers = getCareers();
  return <main>
    <Nav />
    <section className="hero shell">
      <div className="heroCopy">
        <div className="pill">✦ CareerAtlas v0.2 · Experience the work</div>
        <h1>Don’t choose a major <span>before you understand the life.</span></h1>
        <p className="heroLead">CareerAtlas lets you step inside a realistic workday: choose the tasks you would take, see how professionals handle them, then reflect on what actually interested you.</p>
        <HeroCareerSearch careers={careers} />
        <div className="heroActions">
          <Link className="button primary" href="/quiz">Take the career test <span>→</span></Link>
          <a className="button ghost" href="#explore">Browse careers</a>
        </div>
        <div className="trustLine"><span>Evidence-backed</span><i></i><span>Student-first</span><i></i><span>AI-aware</span></div>
      </div>
    </section>

    <section className="logoStrip"><div className="shell evidenceText"><span>Built to connect trusted labor data with a modern experience layer</span><b>O*NET</b><b>BLS</b><b>CareerOneStop</b><b>CareerAtlas Analysis</b></div></section>

    <section className="shell section" id="explore">
      <div className="sectionHead"><div><span className="eyebrow">Start exploring</span><h2>Explore careers by trying the work.</h2></div><p>Search across technology, healthcare, skilled trades, business, design, education, law, and human behavior.</p></div>
      <CareerExplorer careers={careers} />
      <p className="sourceNote">*Prototype data is illustrative and will be replaced/validated against dated official sources in the production data pipeline.</p>
    </section>

    <section className="shell section"><HomeInteractive /></section>

    <section className="shell section experienceGrid">
      <div className="expCopy"><span className="eyebrow">More than facts</span><h2>See the work. Feel the tradeoffs.</h2><p>A title rarely tells you whether you would enjoy the work. So every profile is designed around concrete moments: meetings, decisions, stress, collaboration, outputs, and the parts AI is changing.</p><Link className="textLink" href="/careers/software-developer">Open the software developer experience →</Link></div>
      <div className="timelinePreview">
        {[['09:00','Set priorities','Team'],['09:30','Debug an incident','Reasoning'],['11:00','Design tradeoffs','Systems'],['15:00','Review code','Collaboration']].map((x,i)=><div className="timeItem" key={x[0]}><span>{x[0]}</span><div><b>{x[1]}</b><small>{x[2]}</small></div><em>{i+1}</em></div>)}
      </div>
    </section>

    <section className="finalCta"><div className="shell"><span className="eyebrow light">CareerAtlas v0.2</span><h2>Find career paths that fit how you think, learn, and work.</h2><Link className="button white" href="/quiz">Take the career test <span>→</span></Link></div></section>
  </main>
}
