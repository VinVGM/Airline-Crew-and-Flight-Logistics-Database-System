import '@/app/ui/global.css';

import { lusitana } from './ui/fonts';
import TopLoader from '@/app/ui/top-loader';
import { Suspense } from 'react';
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
