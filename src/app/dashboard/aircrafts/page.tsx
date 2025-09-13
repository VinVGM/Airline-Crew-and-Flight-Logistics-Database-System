import AircraftsTable from '@/app/ui/aircrafts/table';
import Search from '@/app/ui/search';
import { CreateAircraft } from '@/app/ui/aircrafts/buttons';
import { AircraftsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';


export default function Page() {
    return (
        <div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search aircrafts..." />
                <CreateAircraft />
            </div>
            <Suspense fallback={<AircraftsTableSkeleton/>}>
                <AircraftsTable />
            </Suspense>
        </div>
    );
}