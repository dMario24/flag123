import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google'
import TriggerAnalytics from './TriggerAnalytics'
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "@/components/ui/toaster"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { NextThemeProvider } from '@/components/theme-provider';
import { Footer } from "@/app/ui/footer/footer";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const DESCRIPTION = "12.3 계엄배 천하제일 깃발대회 by 민주주의 해방전선 나만 깃발 없엉 총연맹, 재기발랄 천하제일 깃발대회 🚩 겔러리 🖼️ 저장소 🗃️ 검색 🔎";

export const metadata: Metadata = {
  generator: 'Next.js',
  applicationName: '천하제일깃발대회',
  referrer: 'origin-when-cross-origin',
  keywords: ['martial law',
    '2024 South Korean martial law crisis',
    '계엄',
    '천하제일깃발대회',
    '깃없총',
    '나만깃발없엉',
    '재기발랄',
    '탄핵',
    '윤석열',
    '윤건희',
    '천하제일깃발대회',
    '민주주의 해방전선 나만 깃발 없엉 총연맹',
    '나만 깃발 없엉 총연맹',

  ],
  authors: [{ name: 'TomSawyer' }, { name: 'Josh', url: 'https://flag123.diginori.com' }],
  creator: '민주주의 해방전선 나만 깃발 없엉 총연맹',
  publisher: '깃없총',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  title: "천하제일깃발대회 by 깃없총",
  description: DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "천하제일깃발대회",
    siteName: "12.3 계엄배 천하제일 깃발 대회",
    description: DESCRIPTION,
    locale: 'ko_KR',
    type: 'website',
    url: "https://flag123.diginori.com",
    images: {
      url: "https://flag123.diginori.com/og.png",
      alt: DESCRIPTION,
    }
  },
  twitter: {
    card: 'summary_large_image',
    title: '12.3 계엄배 천하제일깃발대회',
    description: DESCRIPTION,
    siteId: 'samdulshop',
    creator: '민주주의 해방전선 나만 깃발 없엉 총연맹',
    creatorId: 'samdulshop',
    images: ['https://flag123.diginori.com/twitter-image.png'], // Must be an absolute URL
  },
};

// export const fetchCache = 'force-no-store';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" >
      <GoogleTagManager gtmId="GTM-KNF3TMFJ" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <NextThemeProvider>
            {children}
            <Toaster />
            <Footer />

            <TriggerAnalytics />
            <Analytics />
            <SpeedInsights />
          </NextThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
