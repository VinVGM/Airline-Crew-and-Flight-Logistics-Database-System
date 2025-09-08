import AcmeLogo from '@/app/ui/logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Acme } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { lusitana } from './ui/fonts';
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-40 shrink-0 items-end rounded-lg bg-[#B9375D] p-4 md:h-52">
        <AcmeLogo  />
      </div>
      <div className=" mt-2 flex grow flex-col md:gap-4 md:flex-row">
        <div className="hidden flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12 md:block">
          <Image
            src="/hero-desktop.png"
            alt="SS of dashboard in desktop"
            width={1024}
            height={760}
            className='hidden md:block'
          />
          
        </div>
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-[#E7D3D3] px-6 py-10 md:w-2/5 md:px-20">
          <p className={`${lusitana.className} text-xl text-white-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to ACFL-DBS.</strong>
            <br />
            Create, Read, Update and Delete your Flight Logistics and Crew Details with ease.

          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-[#D25D5D] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#B9375D] md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>

        <div className="md:hidden flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero-mobile.png"
            alt="SS of dashboard in mobile"
            width={560}
            height={620}
            className='block md:hidden'
          />   
        </div>
        
        
      </div>
    </main>
  );
}
