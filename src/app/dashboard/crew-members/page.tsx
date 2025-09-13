import CrewMembersTable from '@/app/ui/crew-members/table';
import {CreateCrewMembers } from '@/app/ui/crews/buttons';

import Search from '@/app/ui/search';
import { Suspense } from 'react';
import { CrewMembersTableSkeleton } from '@/app/ui/skeletons';

export default function Page() {
    return (
        <div>
            <div className='flex items-center justify-between gap-2 mt-4 md:mt-8'>
                <Search placeholder='Search Crew Members'/>
                <CreateCrewMembers/>
            </div>
            <Suspense fallback={<CrewMembersTableSkeleton/>}>
                <CrewMembersTable />
            </Suspense>
        </div>
    );
}