"use client";
import { useState } from "react";
import { BookOpen, Download, HardDrive, Sparkles } from "lucide-react";
import { useUser } from "./UserProvider";

const slides = [
  { icon: BookOpen, title: "تعلّم وطبّق في المكان نفسه", body: "شرائح قصيرة، تمارين عملية، اختبارات ومشروع نهائي مترابط." },
  { icon: HardDrive, title: "تقدمك محفوظ على هذا الجهاز", body: "لا حساب ولا بريد إلكتروني. بياناتك التدريبية تبقى داخل متصفحك." },
  { icon: Download, title: "خذ نسخة احتياطية متى شئت", body: "صدّر إجاباتك وتقدمك، ثم استوردها على جهاز آخر عند الحاجة." },
];
export function Onboarding() {
  const { data, update } = useUser();
  const [step, setStep] = useState(0);
  const [name, setName] = useState(data.profile.name);
  if (data.profile.onboarded) return null;
  const item = slides[step]; const Icon = item.icon;
  return <div className="onboarding" role="dialog" aria-modal="true" aria-label="مرحبًا بك">
    <div className="onboarding-card">
      <span className="brand-mark"><Sparkles size={22} /></span><span className="kicker">مرحبًا بك في رحلتك</span>
      <Icon size={44} strokeWidth={1.5} className="onboarding-icon" />
      <h1>{item.title}</h1><p>{item.body}</p>
      {step === 2 && <label className="field-label">اسمك (اختياري)<input value={name} onChange={(e) => setName(e.target.value)} placeholder="كيف تحب أن نناديك؟" /></label>}
      <div className="dots" aria-label={`الخطوة ${step + 1} من 3`}>{slides.map((_, i) => <span key={i} className={i === step ? "active" : ""} />)}</div>
      <button className="primary-btn" onClick={() => step < 2 ? setStep(step + 1) : update((current) => ({ ...current, profile: { name: name.trim(), onboarded: true } }))}>{step < 2 ? "التالي" : "ابدأ الرحلة"}</button>
    </div>
  </div>;
}
