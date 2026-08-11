"use client";
import { Award, BookOpen, FolderKanban, Gauge, Home, Menu, MessageSquareText, Search, Settings, Sparkles, Wrench, X } from "lucide-react";
import { useState } from "react";
import { content, courseProgress } from "../lib/content";
import { useUser } from "./UserProvider";
import { Onboarding } from "./Onboarding";

const nav = [
  ["/", "الرئيسية", Home], ["/course", "البرنامج", BookOpen], ["/project", "المشروع", FolderKanban], ["/tools", "الأدوات", Wrench],
  ["/prompts", "Prompts", Sparkles], ["/progress", "تقدمي", Gauge],
] as const;

export function AppShell({ children, current = "/" }: { children: React.ReactNode; current?: string }) {
  const { data, ready } = useUser(); const [menu, setMenu] = useState(false); const progress = courseProgress(data.completedSlides);
  return <div className="app-shell">
    <Onboarding />
    <header className="topbar no-print">
      <a className="brand" href="/"><span className="brand-mark">أ</span><span><b>أثر</b><small>الحقيبة التفاعلية</small></span></a>
      <nav className="desktop-nav" aria-label="القائمة الرئيسية">{nav.map(([href, label]) => <a key={href} href={href} className={current === href ? "active" : ""}>{label}</a>)}</nav>
      <div className="top-actions">
        <a className="search-btn" href="/search" aria-label="البحث"><Search size={19} /></a>
        <a className="progress-chip" href="/progress"><span>{ready ? progress : 0}%</span><i><b style={{ width: `${progress}%` }} /></i></a>
        <a className="icon-btn" href="/settings" aria-label="الإعدادات"><Settings size={19} /></a>
        <button className="icon-btn menu-btn" onClick={() => setMenu(!menu)} aria-label="فتح القائمة">{menu ? <X size={21}/> : <Menu size={21}/>}</button>
      </div>
    </header>
    {menu && <div className="mobile-menu no-print">{nav.map(([href,label,Icon]) => <a key={href} href={href}><Icon size={19}/>{label}</a>)}<a href="/notes"><MessageSquareText size={19}/>الملاحظات</a><a href="/certificate"><Award size={19}/>الشهادة</a></div>}
    <main>{children}</main>
    <footer className="footer no-print"><div><b>الحقيبة التدريبية التفاعلية</b><p>{content.course.title}</p></div><span>نسخة {content.course.version}</span><a href="/privacy">الخصوصية</a></footer>
    <nav className="bottom-nav no-print" aria-label="تنقل الجوال">{nav.slice(0,5).map(([href,label,Icon]) => <a key={href} href={href} className={current===href?"active":""}><Icon size={20}/><small>{label}</small></a>)}</nav>
  </div>;
}
