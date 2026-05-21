import type { Metadata } from 'next';
import { Barlow_Condensed, Inter } from 'next/font/google';
import GlobalNavBar from '@/components/GlobalNavBar';
import GlobalFooter from '@/components/GlobalFooter';
import './globals.css';

const barlowCondensed = Barlow_Condensed({
  variable: '--font-barlow-condensed',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://beasthouse.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Beast House — Riyadh',
    template: '%s | Beast House',
  },
  description:
    'Beast House is a creative-led hub in Riyadh where music, dining, and community come together. Restaurant, Club, Studios, Co-Working, Events, and Membership.',
  keywords: ['Beast House', 'MDLBeast', 'Riyadh', 'restaurant', 'club', 'studios', 'events', 'co-working', 'membership'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Beast House',
    title: 'Beast House — Riyadh',
    description:
      'A creative-led hub in Riyadh where music, dining, and community come together.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beast House — Riyadh',
    description:
      'A creative-led hub in Riyadh where music, dining, and community come together.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${inter.variable} overflow-x-hidden w-full`}>
      <body
        className="min-h-full flex flex-col bg-beast-black text-beast-cream antialiased overflow-x-hidden w-full"
        suppressHydrationWarning
      >
        <GlobalNavBar />
        {children}
        <GlobalFooter />
      </body>
    </html>
  );
}
