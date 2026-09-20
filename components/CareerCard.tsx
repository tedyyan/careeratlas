import Link from "next/link";
import { Career } from "@/lib/careers";

export default function CareerCard({ career, accent = "violet" }: { career: Career; accent?: string }) {
  const href = `/careers/${career.slug}`;
  return (
    <Link href={href} className={`careerCard ${accent}`}>
      <div className="cardTop"><span className="eyebrow">Career experience</span><span className="arrow">↗</span></div>
      <h3>{career.title}</h3>
      <p>{career.tagline}</p>
      <div className="metricRow">
        <span><b>{career.salary}</b><small>median pay*</small></span>
        <span><b>{career.outlook}</b><small>outlook*</small></span>
      </div>
      <div className="chipRow">{career.fit.map(x => <span className="chip" key={x}>{x}</span>)}</div>
    </Link>
  );
}
