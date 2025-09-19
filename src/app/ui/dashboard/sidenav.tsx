import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import Logo from '@/app/ui/logo2'
import { PowerIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/app/login/actions';
import { createClient } from '@/supabase/server';

export default async function SideNav() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;
  let displayName = 'Signed in';
  if (user?.id) {
    const { data: profile } = await supabase
      .from('users')
      .select('name, email')
      .eq('id', user.id)
      .single();
    displayName = (profile?.name as string) || (profile?.email as string) || user.email || 'Signed in';
  }
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 overflow-hidden">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-[#B9375D] p-4 md:h-40"
        href="/"
      >
        <div className="w-40 text-white md:w-40">
          <Logo />
        </div>
      </Link>
      <div className="flex grow flex-row flex-wrap items-start gap-2 md:flex-col md:flex-nowrap md:gap-2 overflow-x-hidden md:overflow-visible">
        <NavLinks />
        <div className="hidden md:block md:flex-1"></div>
        <div className="hidden md:flex items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium text-gray-700">
          <UserCircleIcon className="w-6" />
          <span className="truncate">{displayName}</span>
        </div>
        <form action={signOut}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
