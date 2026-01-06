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

/**
 * 環境に応じたベースURLを取得
 * @returns ベースURL（開発環境ではlocalhost、本番環境では環境変数または固定URL）
 */
const getBaseUrl = (): string => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  return process.env.NEXT_PUBLIC_FRONTEND_BASE_URL || "https://braille-finder.hol1kgmg.com";
};

/**
 * サイトの基本情報
 */
const siteConfig = {
  name: "Braille Finder",
  title: "点字テキスト検索フォーム | Braille Finder",
  description:
    "256パターンの点字をビジュアル検索できるUnicode点字検索ツール。点字記号・ASCIIアート・テキストアートに使える点字文字を簡単にコピー",
  url: getBaseUrl(),
  ogImage: `${getBaseUrl()}/images/og-image.png`,
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
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "Hol1kgmg" }],
  creator: "Hol1kgmg",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
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

        {/* Twitter Cards - アカウントなし版 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteConfig.title} />
        <meta name="twitter:description" content={siteConfig.description} />
        <meta name="twitter:image" content={siteConfig.ogImage} />
        <meta name="twitter:image:alt" content={siteConfig.title} />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />

        {/* 明示的なOGPタグ追加（スマホ表示改善） */}
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta property="og:image:secure_url" content={siteConfig.ogImage} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
