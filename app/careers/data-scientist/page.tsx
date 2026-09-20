import Nav from "@/components/Nav";
import CareerExperience from "@/components/CareerExperience";
import { dataScientistExperience } from "@/lib/careerExperiences";
export default function Page(){return <main><Nav/><CareerExperience config={dataScientistExperience}/></main>}
