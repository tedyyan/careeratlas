import Nav from "@/components/Nav";
import CareerExperience from "@/components/CareerExperience";
import { registeredNurseExperience } from "@/lib/careerExperiences";
export default function Page(){return <main><Nav/><CareerExperience config={registeredNurseExperience}/></main>}
