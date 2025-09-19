import '@/app/ui/global.css';
import type { Metadata } from 'next';

import { lusitana } from './ui/fonts';
import TopLoader from '@/app/ui/top-loader';
import { Suspense } from 'react';

export const metadata: Metadata = {
  icons: {
    icon: undefined,
    shortcut: undefined,
    apple: undefined,
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lusitana.className} antialiased bg-[#EEEEEE] `}>
        <Suspense fallback={null}>
          <TopLoader />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
