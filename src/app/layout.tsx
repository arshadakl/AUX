import type { Metadata } from 'next';
import { AlertDialogProvider } from '@/components/ui/extended/alert-dialog-provider';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { NextIntlProvider } from '@/providers/next-intl-provider';
import { ReactQueryProvider } from '@/providers/react-query-provider';
import { getLocale, getMessages, getNow, getTimeZone } from 'next-intl/server';
import { inter, sourceSerif4 } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Form Collection - Submit Your Information',
  description: 'Submit your personal information through our secure form. Your data will be safely stored in our Google Sheets database.',
  keywords: ['form', 'submission', 'data collection', 'secure form'],
  authors: [{ name: 'Your App Name' }],
  creator: 'Your App Name',
  publisher: 'Your App Name',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://yourapp.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Form Collection - Submit Your Information',
    description: 'Submit your personal information through our secure form. Your data will be safely stored in our Google Sheets database.',
    url: 'https://yourapp.com', // Replace with your actual domain
    siteName: 'Form Collection App',
    images: [
      {
        url: '/og-image.jpg', // This should match your image filename in public folder
        width: 1200,
        height: 630,
        alt: 'Form Collection App - Secure Data Submission',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Form Collection - Submit Your Information',
    description: 'Submit your personal information through our secure form. Your data will be safely stored in our Google Sheets database.',
    images: ['/og-image.jpg'], // This should match your image filename in public folder
    creator: '@yourtwitterhandle', // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const now = await getNow();
  const timeZone = await getTimeZone();
  const messages = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sourceSerif4.variable} min-h-screen font-sans antialiased`}>
        <ReactQueryProvider>
          <NextIntlProvider locale={locale} messages={messages} now={now} timeZone={timeZone}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AlertDialogProvider>
                {children}
              </AlertDialogProvider>
            </ThemeProvider>
          </NextIntlProvider>
          <Toaster />
          <SonnerToaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
