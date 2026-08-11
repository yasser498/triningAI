import { LearningView } from "../../../../components/LearningView";
export default async function Page({params,searchParams}:{params:Promise<{dayId:string;moduleId:string}>;searchParams:Promise<{slide?:string}>}){const p=await params;const query=await searchParams;return <LearningView dayId={p.dayId} moduleId={p.moduleId} initialSlide={Number(query.slide||0)}/>}
