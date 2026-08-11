import course from "../data/course.json";
import day1 from "../data/days/day-1.json";
import day2 from "../data/days/day-2.json";
import day3 from "../data/days/day-3.json";
import quizzes from "../data/quizzes.json";
import project from "../data/project.json";
import resources from "../data/resources.json";
import glossary from "../data/glossary.json";
import prompts from "../data/prompts.json";
import dataset from "../data/dataset.json";
import type { Day, Quiz } from "../types";

export const content = { course, days: [day1, day2, day3] as Day[], quizzes: quizzes as Quiz[], project, resources, glossary, prompts, dataset };
export const allModules = content.days.flatMap((day) => day.modules.map((module) => ({ day, module })));
export const totalSlides = allModules.reduce((sum, item) => sum + item.module.slides.length, 0);
export const totalActivities = allModules.reduce((sum, item) => sum + item.module.slides.filter((slide) => slide.type === "activity").length, 0);
export const findQuiz = (id?: string) => content.quizzes.find((quiz) => quiz.id === id);
export const courseProgress = (completed: string[]) => Math.round((new Set(completed).size / totalSlides) * 100);
export const moduleProgress = (moduleId: string, completed: string[]) => {
  const found = allModules.find((item) => item.module.id === moduleId)?.module;
  if (!found) return 0;
  return Math.round((found.slides.filter((slide) => completed.includes(slide.id)).length / found.slides.length) * 100);
};
export const dayProgress = (dayId: string, completed: string[]) => {
  const day = content.days.find((item) => item.id === dayId);
  if (!day) return 0;
  const slides = day.modules.flatMap((module) => module.slides);
  return Math.round((slides.filter((slide) => completed.includes(slide.id)).length / slides.length) * 100);
};
export const nextSlideIndex = (current: number, total: number, direction: "next" | "previous") => direction === "next" ? Math.min(total - 1, current + 1) : Math.max(0, current - 1);
export const scoreQuiz = (quiz: Quiz, answers: Record<string, string[]>) => {
  const correct = quiz.questions.reduce((sum, question) => {
    const expected = [...question.correctAnswer].sort();
    const actual = [...(answers[question.id] || [])].sort();
    return sum + (JSON.stringify(expected) === JSON.stringify(actual) ? 1 : 0);
  }, 0);
  return { score: correct, total: quiz.questions.length, percentage: Math.round((correct / quiz.questions.length) * 100) };
};
