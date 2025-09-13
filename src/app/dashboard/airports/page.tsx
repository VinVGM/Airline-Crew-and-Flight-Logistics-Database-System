import AirportsTable from '@/app/ui/airports/table';
import Search from '@/app/ui/search';
import { CreateAirport } from '@/app/ui/airports/buttons';
import { AirportsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';


export default function Page() {
    return (
        <div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search airports..." />
                <CreateAirport />
            </div>
            <Suspense fallback={<AirportsTableSkeleton/>}>
                <AirportsTable />
            </Suspense>
        </div>
    );
}