import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://braille-finder.hol1kgmg.com"),
  title: "点字テキスト検索フォーム | Braille Finder",
  description:
    "256パターンの点字をビジュアル検索できるUnicode点字検索ツール。点字記号・ASCIIアート・テキストアートに使える点字文字を簡単にコピー",
  keywords: [
    "点字",
    "braille",
    "Unicode",
    "検索",
    "アクセシビリティ",
    "視覚的検索",
    "点字テキスト",
    "フォーム",
    "アスキーアート",
    "ASCIIアート",
    "テキストアート",
    "点字記号",
    "点字パターン",
  ],
  authors: [{ name: "Hol1kgmg" }],
  creator: "Hol1kgmg",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "点字テキスト検索フォーム",
    alternateName: "Braille Finder",
    description:
      "256パターンの点字をビジュアル検索できるUnicode点字検索ツール。点字記号・ASCIIアート・テキストアートに使える点字文字を簡単にコピー",
    url: "https://braille-finder.hol1kgmg.com",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "JPY",
    },
    inLanguage: "ja",
  };

  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
