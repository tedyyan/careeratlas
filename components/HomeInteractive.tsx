"use client";
import { useState } from "react";

const options = ["I want to build things", "I want to help people", "I like solving hard problems", "I want a predictable schedule", "I want strong earning potential", "I like understanding people"];

export default function HomeInteractive() {
  const [selected, setSelected] = useState<string[]>(["I like solving hard problems"]);
  const toggle = (x:string) => setSelected(s => s.includes(x) ? s.filter(v=>v!==x) : [...s,x]);
  return (
    <div className="discoveryCard">
      <div>
        <span className="eyebrow light">AI-guided exploration</span>
        <h2>What kind of life and work sounds like you?</h2>
        <p>Pick a few. CareerAtlas explains why each recommendation may fit — no black-box “destiny score.”</p>
      </div>
      <div className="choiceGrid">
        {options.map(x => <button onClick={()=>toggle(x)} className={selected.includes(x)?"choice active":"choice"} key={x}>{selected.includes(x)?"✓ ":""}{x}</button>)}
      </div>
      <a className="button white" href="#explore">Show my career ideas <span>→</span></a>
    </div>
  );
}
