import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import ThemeProviderWrapper from '@/components/ThemeProviderWrapper';
import Chatbot from '@/components/Chatbot';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-card-title',
  weight: ['500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-nav',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HAENAM PARK',
  description: '도전을 기회로, 가능성을 열어가는 개발자',
  keywords: ['Backend Developer', 'Fullstack', 'Portfolio', 'Resume', '박해남', 'Haenam Park'],
  authors: [{ name: '박해남', url: 'https://baobab00.github.io' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'HAENAM PARK',
    description: '도전을 기회로, 가능성을 열어가는 개발자',
    url: 'https://baobab00.github.io',
    siteName: 'HAENAM PARK',
    images: [
      {
        url: '/images/profile.png',
        width: 400,
        height: 400,
        alt: '박해남 프로필',
      },
    ],
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary',
    title: 'HAENAM PARK',
    description: '도전을 기회로, 가능성을 열어가는 개발자',
    images: ['/images/profile.png'],
  },
  metadataBase: new URL('https://baobab00.github.io'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${plusJakarta.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProviderWrapper>
          {children}
          <Chatbot />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
