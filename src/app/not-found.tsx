import { buttonVariants } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-2 select-none text-9xl font-bold text-[#dbdbdb]">404</h1>
      <h1 className="text-2xl font-bold">Not Found</h1>
      <p className="mb-5 mt-2 text-gray-700 opacity-65">We could not find what you were looking for!</p>
      <Link href="/" className={cn(buttonVariants({ className: 'hover:bg-[##4e46e6]/90 bg-[#4e46e6]' }))}>
        Go Home
      </Link>
    </section>
  );
}
