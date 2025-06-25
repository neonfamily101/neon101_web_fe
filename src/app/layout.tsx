import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import clsx from 'clsx';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const jetbrainsMono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NEON101 - 맞춤형 AI Transformation 서비스",
  description:
    "NEON101은 'Human in the Loop' 철학을 바탕으로, AI의 자동화 능력과 인간의 동조화를 이루는 맞춤형 AI Transformation 서비스와 플랫폼을 제공하기 위해 탄생한 AX Company Group입니다.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={clsx(
          inter.variable,
          jetbrainsMono.variable,
          'bg-background font-arial text-[#ededed] antialiased selection:bg-[#00fff61d] selection:text-[#67ffded2]'
        )}
      >
        {children}
      </body>
    </html>
  );
}
