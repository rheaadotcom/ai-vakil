import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-ui-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Vakil | Legal Document Intelligence Platform",
  description:
    "AI-powered legal document intelligence. Analyze contracts, detect clause risks, track obligations, and ask questions with citation-backed legal intelligence.",
  keywords: [
    "AI Legal SaaS",
    "Contract Analysis",
    "Legal Intelligence",
    "Indian Law AI",
    "AI Vakil",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-[#070707] text-[#F8F7FB] selection:bg-violet-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
