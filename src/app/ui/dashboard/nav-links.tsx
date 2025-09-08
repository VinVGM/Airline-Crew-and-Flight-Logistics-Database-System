'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Employees',
    href: '/dashboard/employees',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Crew Members', href: '/dashboard/crew-members', icon: UserGroupIcon },
  { name: 'Crew', href: '/dashboard/crews', icon: UserGroupIcon },
  { name: 'Flights', href: '/dashboard/flights', icon: UserGroupIcon },
  { name: 'Aircrafts', href: '/dashboard/aircrafts', icon: UserGroupIcon },
  { name: 'Schedules', href: '/dashboard/schedules', icon: UserGroupIcon },
  
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-[#E7D3D3] hover:text-white md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-[#E7D3D3] text-black font-bold': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
