'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import * as Sentry from '@sentry/nextjs';
import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError(props: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(props.error);
  }, [props.error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="mb-2 select-none text-9xl font-bold text-[#dbdbdb]">500</h1>
        <h1 className="text-2xl font-bold">Internal Error</h1>
        <p className="mb-5 mt-2 text-gray-700 opacity-65">
          Something went wrong!
          {'We\'re'}
          {' '}
          working on it!
        </p>
        {process.env.NODE_ENV === 'development' && <pre className="my-3">{props.error.stack}</pre>}
        <Link href="/" className={cn(buttonVariants({ className: 'hover:bg-[##4e46e6]/90 bg-[#4e46e6]' }))}>
          Go Home
        </Link>
      </body>
    </html>
  );
}
