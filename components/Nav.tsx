import Link from "next/link";

export default function Nav() {
  return (
    <nav className="nav shell">
      <Link href="/" className="brand"><span className="brandMark">CA</span><span>CareerAtlas <b>AI</b></span></Link>
      <div className="navLinks">
        <Link href="/#explore">Explore</Link>
        <Link href="/compare">Compare</Link>
        <Link href="/quiz">Career Test</Link>
      </div>
      <Link href="/quiz" className="smallCta">Take the test</Link>
    </nav>
  );
}
