import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'Tashqariga — Shahardan qoching. Tashqariga chiqing!',
  description: '«Tashqariga» — to‘rtta devor, cheksiz tirbandlik va ofis monitorlariga qarshi yoshlar harakati. O‘zbekiston tog‘ sayohatlari va hiking agregatori.',
  keywords: ['hiking', 'tog', 'sayohat', 'chimyon', 'soqoq', 'urungach', 'tashqariga', 'turizm', 'uzbekistan', 'suramiz'],
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <head>
        {/* Telegram WebApp official SDK script */}
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col selection:bg-adventure-500 selection:text-white">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
