import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to ACFL-DBS - Airline Crew and Flight Logistics Database System',
  openGraph: {
    title: 'Login - ACFL-DBS',
    description: 'Sign in to ACFL-DBS - Airline Crew and Flight Logistics Database System',
    images: ['/meta.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Login - ACFL-DBS',
    description: 'Sign in to ACFL-DBS - Airline Crew and Flight Logistics Database System',
    images: ['/meta.png'],
  },
};

import Logo from '../ui/logo2'; 
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-[#B9375D] p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <Logo />
          </div>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
