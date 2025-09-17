import CrewMembersTable from '@/app/ui/crew-members/table';
import {CreateCrewMembers } from '@/app/ui/crews/buttons';

import Search from '@/app/ui/search';
import { Suspense } from 'react';
import { CrewMembersTableSkeleton } from '@/app/ui/skeletons';
import Pagination from '@/app/ui/util_components/pagination';
import { fetchCrewMembers } from '@/app/lib/data-acfl';
import { fetchCrewMembersPages } from '@/app/lib/data-acfl';
import Breadcrumbs from '@/app/ui/util_components/breadcrumbs';

export default async function Page(props : {
    searchParams?: Promise<
        {
            query?: string;
            page?: string;
        }
    >
}) {

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchCrewMembersPages(query);

    return (
        <div>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Crew Members', href: '/dashboard/crew-members', active: true },
                ]}
            />
            <div className='flex items-center justify-between gap-2 mt-4 md:mt-8'>
                <Search placeholder='Search Crew Members'/>
                <CreateCrewMembers/>
            </div>
            <Suspense key={query + currentPage} fallback={<CrewMembersTableSkeleton/>}>
                <CrewMembersTable query={query} currentPage={currentPage} />
            </Suspense>

            <div className='mt-5 flex w-full justify-center'>
                <Pagination totalPages={totalPages}/>
            </div>
        </div>
    );
}