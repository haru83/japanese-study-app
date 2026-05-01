import type { Metadata } from "next";
import { Zen_Maru_Gothic, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/session-provider";

const zenMaruGothic = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-zen-maru",
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "다이어리 일본어",
  description: "일기 쓰기와 경어 학습을 한 번에",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body
        className={`${zenMaruGothic.variable} ${notoSansKR.variable} font-body bg-sakura-blush min-h-screen flex justify-center`}
      >
        <div className="w-full max-w-md min-h-screen bg-sakura-blush shadow-2xl overflow-hidden relative">
          <SessionProvider>{children}</SessionProvider>
        </div>
      </body>
    </html>
  );
}
