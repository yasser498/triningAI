export type FieldType = "text" | "textarea" | "select" | "radio" | "checkbox" | "rating";
export type ActivityField = { id: string; label: string; type: FieldType; options?: string[] };
export type Activity = { id: string; title: string; description: string; instructions: string; duration: string; fields: ActivityField[]; tips?: string[]; example?: string; completionCriteria?: string };
export type Slide = {
  id: string; type: string; title?: string; body?: string; eyebrow?: string; items?: any[]; columns?: any[];
  headers?: string[]; rows?: string[][]; activity?: Activity; quizId?: string; bad?: string; good?: string; href?: string; dataset?: boolean;
};
export type Module = { id: string; title: string; description: string; duration: string; learningObjectives: string[]; slides: Slide[] };
export type Day = { id: string; dayNumber: number; title: string; description: string; objectives: string[]; duration: string; modules: Module[] };
export type QuizQuestion = { id: string; type: "single-choice" | "multiple-choice" | "true-false"; question: string; options: string[]; correctAnswer: string[]; explanation: string };
export type Quiz = { id: string; title: string; questions: QuizQuestion[] };
export type UserData = {
  profile: { name: string; onboarded: boolean };
  completedSlides: string[]; completedActivities: string[]; activityAnswers: Record<string, Record<string, unknown>>;
  quizResults: Record<string, { score: number; total: number; percentage: number }>;
  projectAnswers: Record<string, string>; notes: Record<string, string>; bookmarks: string[];
  lastVisited?: { dayId: string; moduleId: string; slideIndex: number };
  settings: { theme: "light" | "dark" | "system"; fontSize: "small" | "medium" | "large" | "xlarge"; animations: boolean };
};
