import { AssessmentView } from "../../../components/LearningView";
export default async function Page({params}:{params:Promise<{quizId:string}>}){const p=await params;return <AssessmentView quizId={p.quizId}/>}
