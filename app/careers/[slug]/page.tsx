import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { careers } from "@/lib/careers";
import { getCareer } from "@/lib/careerDatabase";

export function generateStaticParams() {
  return careers.map(({ slug }) => ({ slug }));
}

export default async function CareerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const career = getCareer(slug);
  if (!career) notFound();

  return <main>
    <Nav />
    <section className="genericCareerHero shell">
      <Link className="genericCareerBack" href="/#explore">← Explore all careers</Link>
      <span className="eyebrow">Career profile</span>
      <h1>{career.title}</h1>
      <p>{career.overview}</p>
      <div className="genericCareerMetrics">
        <div><b>{career.salary}</b><span>Median pay*</span></div>
        <div><b>{career.outlook}</b><span>Job outlook*</span></div>
        <div><b>{career.education}</b><span>Typical pathway</span></div>
        <div><b>{career.ai}</b><span>AI impact</span></div>
      </div>
    </section>
    <section className="genericCareerBody shell">
      <article>
        <span className="eyebrow">What fits this work</span>
        <h2>Interests and strengths</h2>
        <div className="educationTags">{career.fit.map((item) => <b key={item}>{item}</b>)}</div>
      </article>
      <article>
        <span className="eyebrow">How people prepare</span>
        <h2>Education pathway</h2>
        <p>{career.educationPath}</p>
        <div className="educationTags">{career.majors.map((item) => <b key={item}>{item}</b>)}</div>
      </article>
      <article>
        <span className="eyebrow">What you will learn</span>
        <h2>Knowledge areas</h2>
        <div className="educationTags">{career.knowledgeAreas.map((item) => <b key={item}>{item}</b>)}</div>
      </article>
    </section>
    <section className="genericCareerCta shell">
      <div><span className="eyebrow">Keep exploring</span><h2>Compare this path with another career.</h2></div>
      <Link className="button primary" href="/compare">Compare careers →</Link>
    </section>
    <p className="genericCareerNote shell">*Pay and outlook are rounded prototype snapshots for exploration. Confirm current figures and local requirements with BLS, O*NET, licensing boards, and schools before making decisions.</p>
  </main>;
}
