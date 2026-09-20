import Nav from "@/components/Nav";
import CareerExperience from "@/components/CareerExperience";
import { psychologistExperience } from "@/lib/careerExperiences";
export default function Page(){return <main><Nav/><CareerExperience config={psychologistExperience}/></main>}
