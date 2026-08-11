import { openDB } from "idb";
import type { UserData } from "../types";

const KEY = "training-user-data";
export const initialUserData: UserData = {
  profile: { name: "", onboarded: false }, completedSlides: [], completedActivities: [], activityAnswers: {}, quizResults: {}, projectAnswers: {}, notes: {}, bookmarks: [],
  settings: { theme: "system", fontSize: "medium", animations: true },
};

const dbPromise = typeof window === "undefined" ? null : openDB("training-learning-engine", 1, {
  upgrade(db) { if (!db.objectStoreNames.contains("user")) db.createObjectStore("user"); },
});

export async function loadUserData(): Promise<UserData> {
  try {
    const db = await dbPromise;
    const value = await db?.get("user", KEY);
    if (value) return { ...initialUserData, ...value, settings: { ...initialUserData.settings, ...value.settings } };
    const fallback = localStorage.getItem(KEY);
    return fallback ? validateBackup(JSON.parse(fallback)) : initialUserData;
  } catch { return initialUserData; }
}

export async function saveUserData(data: UserData) {
  localStorage.setItem(KEY, JSON.stringify(data));
  try { const db = await dbPromise; await db?.put("user", data, KEY); } catch { /* localStorage remains as fallback */ }
}

export function validateBackup(value: unknown): UserData {
  if (!value || typeof value !== "object") throw new Error("ملف النسخة الاحتياطية غير صالح");
  const data = value as Partial<UserData>;
  if (!data.profile || !Array.isArray(data.completedSlides) || !data.settings) throw new Error("الملف لا يحتوي بنية بيانات معروفة");
  return { ...initialUserData, ...data, settings: { ...initialUserData.settings, ...data.settings } } as UserData;
}

export async function clearUserData() {
  localStorage.removeItem(KEY);
  try { const db = await dbPromise; await db?.delete("user", KEY); } catch { /* already cleared fallback */ }
}
