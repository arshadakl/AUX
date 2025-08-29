'use client';

import { NextIntlClientProvider } from 'next-intl';

type Messages = Record<string, any>;

export function NextIntlProvider({
  children,
  locale,
  messages,
  now,
  timeZone,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Messages;
  now: Date;
  timeZone: string;
}) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale} now={now} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  );
}
