import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'Tashqariga — O‘zbekiston Tog‘lari va Hiking Agregatori',
  description: 'O‘zbekistondagi eng yaxshi tog‘ sayohatlari, hiking va kembing turlarini toping, taqqoslang va 1 daqiqada joy band qiling.',
  keywords: ['hiking', 'tog', 'sayohat', 'chimyon', 'soqoq', 'urungach', 'tashqariga', 'turizm', 'uzbekistan'],
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
