export type Career = {
  slug: string;
  title: string;
  tagline: string;
  salary: string;
  outlook: string;
  education: string;
  ai: string;
  fit: string[];
};

export const careers: Career[] = [
  {
    slug: "software-developer",
    title: "Software Developer",
    tagline: "Build the systems people rely on — and solve problems that rarely come with perfect instructions.",
    salary: "$132K",
    outlook: "+17%",
    education: "Bachelor's common",
    ai: "High augmentation",
    fit: ["Problem solving", "Systems thinking", "Collaboration"]
  },
  {
    slug: "pediatrician",
    title: "Pediatrician",
    tagline: "Combine science, judgment, and trust to care for children and guide families.",
    salary: "$205K",
    outlook: "+4%",
    education: "MD/DO + residency",
    ai: "Low replacement / high support",
    fit: ["Empathy", "Science", "Communication"]
  },
  {
    slug: "psychologist",
    title: "Psychologist",
    tagline: "Understand behavior, assess complex problems, and help people change how they think and live.",
    salary: "$92K",
    outlook: "+6%",
    education: "Graduate degree",
    ai: "Moderate support",
    fit: ["Listening", "Analysis", "Human connection"]
  },
  {
    slug: "registered-nurse", title: "Registered Nurse", tagline: "Coordinate complex bedside care, notice subtle changes, and advocate for patients when minutes matter.",
    salary: "$94K", outlook: "+5%", education: "Nursing degree + license", ai: "High support / human-led", fit: ["Care", "Prioritization", "Teamwork"]
  },
  {
    slug: "data-scientist", title: "Data Scientist", tagline: "Turn imperfect data into evidence, experiments, and decisions people can act on.",
    salary: "$113K", outlook: "+34%", education: "Bachelor's common", ai: "High augmentation", fit: ["Statistics", "Curiosity", "Communication"]
  },
  {
    slug: "mechanical-engineer", title: "Mechanical Engineer", tagline: "Design physical systems that must survive real forces, manufacturing limits, and testing.",
    salary: "$102K", outlook: "+9%", education: "Bachelor's common", ai: "Moderate augmentation", fit: ["Physics", "Design", "Hands-on testing"]
  },
  {
    slug: "high-school-teacher", title: "High School Teacher", tagline: "Build understanding, motivate different learners, and shape a classroom where students can grow.",
    salary: "$64K", outlook: "−2%", education: "Bachelor's + license", ai: "Support / human-led", fit: ["Teaching", "Adaptability", "Relationships"]
  },
  {
    slug: "lawyer", title: "Lawyer", tagline: "Research uncertain rules, write precisely, and help clients make high-stakes choices.",
    salary: "$152K", outlook: "+4%", education: "JD + bar admission", ai: "High augmentation", fit: ["Reasoning", "Writing", "Advocacy"]
  },
  { slug:"accountant",title:"Accountant",tagline:"Turn transactions into reliable records, controls, and financial decisions.",salary:"$82K",outlook:"+5%",education:"Bachelor's common",ai:"High augmentation",fit:["Accuracy","Business","Analysis"] },
  { slug:"electrician",title:"Electrician",tagline:"Install, test, and troubleshoot the electrical systems that keep buildings working safely.",salary:"$62K",outlook:"+9%",education:"Apprenticeship common",ai:"Low replacement",fit:["Hands-on work","Troubleshooting","Safety"] },
  { slug:"physical-therapist",title:"Physical Therapist",tagline:"Help people restore movement and return to the activities that matter to them.",salary:"$101K",outlook:"+11%",education:"DPT + license",ai:"Support / human-led",fit:["Movement","Coaching","Healthcare"] },
  { slug:"marketing-manager",title:"Marketing Manager",tagline:"Connect audience insight, creative strategy, channels, and measurable growth.",salary:"$161K",outlook:"+7%",education:"Bachelor's common",ai:"High augmentation",fit:["Creativity","Strategy","Communication"] },
  { slug:"architect",title:"Architect",tagline:"Turn human needs and complex constraints into spaces people can inhabit.",salary:"$96K",outlook:"+4%",education:"Degree + licensure",ai:"High augmentation",fit:["Design","Systems thinking","Collaboration"] }
];
