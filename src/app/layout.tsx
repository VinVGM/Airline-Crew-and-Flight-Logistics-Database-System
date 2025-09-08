import '@/app/ui/global.css';

import { lusitana } from './ui/fonts';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lusitana.className} antialiased bg-[#EEEEEE] `}>{children}</body>
    </html>
  );
}
