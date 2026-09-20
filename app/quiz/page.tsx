import Nav from "@/components/Nav";
import CareerQuiz from "@/components/CareerQuiz";
import { getCareers } from "@/lib/careerDatabase";

export default function QuizPage() {
  return <main><Nav/><div className="quizPage shell"><CareerQuiz careers={getCareers()} /></div></main>;
}
