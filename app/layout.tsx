import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "../components/UserProvider";
import { ServiceWorker } from "../components/ServiceWorker";

export const metadata: Metadata = {
  metadataBase: new URL("https://trining-ai.vercel.app"),
  title: { default: "الذكاء الاصطناعي في القطاع غير الربحي", template: "%s | حقيبة أثر" },
  description: "حقيبة تدريبية تفاعلية عربية لتطبيق الذكاء الاصطناعي في المبادرات والمشاريع والبيانات وقياس الأثر.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: { title: "الذكاء الاصطناعي في القطاع غير الربحي", description: "تعلم، طبّق، وقِس الأثر داخل حقيبة تفاعلية واحدة.", type: "website", locale: "ar_SA", images: [{ url: "/og.png", width: 1680, height: 945, alt: "الذكاء الاصطناعي في القطاع غير الربحي" }] },
  twitter: { card: "summary_large_image", title: "الذكاء الاصطناعي في القطاع غير الربحي", description: "تعلم، طبّق، وقِس الأثر.", images: ["/og.png"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body><UserProvider><ServiceWorker/>{children}</UserProvider></body>
    </html>
  );
}
