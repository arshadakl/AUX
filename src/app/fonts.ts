import { Inter, Source_Serif_4 } from 'next/font/google';

export const sourceSerif4 = Source_Serif_4({
  weight: '600',
  subsets: ['latin'],
  variable: '--font-source',
});

export const inter = Inter({
  weight: ['100', '200', '400', '900'],
  subsets: ['latin'],
  variable: '--font-inter',
});
