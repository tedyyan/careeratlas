export type CareerEducation = {
  overview: string;
  educationPath: string;
  majors: string[];
  knowledgeAreas: string[];
};

// Education paths and fields of study are paraphrased from each occupation's
// BLS Occupational Outlook Handbook profile. Knowledge areas use O*NET's
// occupation-specific "Knowledge" labels (not invented course titles).
export const careerEducation: Record<string, CareerEducation> = {
  "software-developer": {
    overview: "Software developers design computer applications or programs, analyze users’ needs, plan how system components work together, and maintain and test software after release.",
    educationPath: "A bachelor’s degree is typically needed; some employers prefer a master’s degree.",
    majors: ["Computer and information technology", "Engineering", "Mathematics"],
    knowledgeAreas: ["Computers and Electronics", "Customer and Personal Service", "Mathematics", "English Language"],
  },
  pediatrician: {
    overview: "General pediatricians diagnose, treat, and help prevent diseases and injuries in children, and guide families on health, development, and preventive care.",
    educationPath: "Physicians typically complete a bachelor’s degree, a medical degree, and 3 to 9 years of internship and residency; all states require licensure.",
    majors: ["No specific undergraduate major required", "Medical degree (M.D. or D.O.)"],
    knowledgeAreas: ["Medicine and Dentistry", "Therapy and Counseling", "Biology", "Psychology", "Customer and Personal Service"],
  },
  psychologist: {
    overview: "Clinical and counseling psychologists assess and treat mental, emotional, and behavioral disorders and help clients understand and change patterns of behavior.",
    educationPath: "Psychologists typically need an advanced degree; clinical and counseling psychologists usually need a Ph.D. or Psy.D. and must meet state licensure requirements.",
    majors: ["Psychology", "Clinical psychology", "Counseling psychology"],
    knowledgeAreas: ["Psychology", "Therapy and Counseling", "English Language", "Education and Training", "Customer and Personal Service"],
  },
  "registered-nurse": {
    overview: "Registered nurses assess patients, record medical histories and symptoms, administer treatments, collaborate with healthcare teams, and teach patients how to manage illness or injury.",
    educationPath: "Registered nurses usually enter through a bachelor’s or associate’s nursing degree or an approved nursing diploma, then must be licensed.",
    majors: ["Nursing (BSN)", "Nursing (ADN or ASN)", "Approved nursing diploma"],
    knowledgeAreas: ["Psychology", "Customer and Personal Service", "Medicine and Dentistry", "English Language", "Administrative"],
  },
  "data-scientist": {
    overview: "Data scientists use analytical tools and techniques to extract meaningful insights from data, build and test models, and communicate findings to stakeholders.",
    educationPath: "A bachelor’s degree is typically required; some employers require or prefer a master’s or doctoral degree.",
    majors: ["Mathematics", "Statistics", "Computer science", "Business", "Engineering"],
    knowledgeAreas: ["Mathematics", "Computers and Electronics", "English Language"],
  },
  "mechanical-engineer": {
    overview: "Mechanical engineers research, design, develop, build, and test mechanical and thermal devices, including tools, engines, and machines.",
    educationPath: "A bachelor’s degree in mechanical engineering or mechanical engineering technology is typically required.",
    majors: ["Mechanical engineering", "Mechanical engineering technology"],
    knowledgeAreas: ["Design", "Engineering and Technology", "Production and Processing", "Mechanical", "English Language"],
  },
  "high-school-teacher": {
    overview: "High school teachers plan lessons, teach academic subjects, assess student progress, adapt instruction, and communicate with parents and school staff.",
    educationPath: "Public-school teachers typically need a bachelor’s degree and state certification or licensure; private schools may not require state licensure.",
    majors: ["Education", "The subject taught, such as mathematics, science, or history"],
    knowledgeAreas: ["Education and Training", "English Language", "Customer and Personal Service", "Computers and Electronics", "Psychology"],
  },
  lawyer: {
    overview: "Lawyers advise and represent clients, research and interpret laws and regulations, present facts, and prepare legal documents.",
    educationPath: "Becoming a lawyer usually takes 7 years of full-time study after high school—4 years of undergraduate study followed by 3 years of law school—and typically requires a state bar license.",
    majors: ["No specific undergraduate major required", "Law (J.D.)"],
    knowledgeAreas: ["Law and Government", "English Language", "Customer and Personal Service", "Administrative", "Computers and Electronics"],
  },
  accountant: {
    overview: "Accountants and auditors prepare and examine financial records, identify risks and opportunities, assess operations, and help organizations run efficiently.",
    educationPath: "A bachelor’s degree in accounting or a related field is typically required; CPA licensure may be required for certain work.",
    majors: ["Accounting", "Business with an accounting concentration", "Related business field"],
    knowledgeAreas: ["Economics and Accounting", "English Language", "Mathematics", "Law and Government", "Administration and Management"],
  },
  electrician: {
    overview: "Electricians install, maintain, and repair electrical power, communications, lighting, and control systems in homes, businesses, and factories.",
    educationPath: "Most electricians learn through a 4- or 5-year apprenticeship; some begin at a technical school. Most states require licensure.",
    majors: ["Electrical technology (technical-school option)", "Registered electrician apprenticeship"],
    knowledgeAreas: ["Building and Construction", "Administration and Management", "Mechanical", "Mathematics", "Design"],
  },
  "physical-therapist": {
    overview: "Physical therapists evaluate movement problems, create individualized care plans, use exercises and hands-on therapy, and track patients’ progress.",
    educationPath: "Physical therapists need a Doctor of Physical Therapy (DPT) degree from an accredited program and must be licensed in every state.",
    majors: ["Doctor of Physical Therapy (DPT)", "Undergraduate study meeting DPT prerequisites"],
    knowledgeAreas: ["Customer and Personal Service", "Therapy and Counseling", "Medicine and Dentistry", "Psychology", "Education and Training"],
  },
  "marketing-manager": {
    overview: "Marketing managers estimate demand, identify potential markets, develop pricing and customer-acquisition strategies, and work with product, sales, and creative teams.",
    educationPath: "A bachelor’s degree and related work experience are typically required.",
    majors: ["Business", "Marketing", "Communications"],
    knowledgeAreas: ["Sales and Marketing", "English Language", "Customer and Personal Service", "Communications and Media", "Administration and Management"],
  },
  architect: {
    overview: "Architects plan and design buildings and other structures, prepare drawings and specifications, meet clients, and visit worksites to review progress.",
    educationPath: "Architects typically earn a professional architecture degree, complete paid internship experience, and pass the Architect Registration Examination.",
    majors: ["Architecture (B.Arch.)", "Architecture (M.Arch.)"],
    knowledgeAreas: ["Design", "Building and Construction", "Engineering and Technology", "Customer and Personal Service", "Public Safety and Security"],
  },
};
