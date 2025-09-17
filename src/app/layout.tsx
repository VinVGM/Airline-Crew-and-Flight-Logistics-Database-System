import '@/app/ui/global.css';

import { lusitana } from './ui/fonts';
import TopLoader from '@/app/ui/top-loader';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lusitana.className} antialiased bg-[#EEEEEE] `}>
        <TopLoader />
        {children}
      </body>
    </html>
  );
}
