import FlightsTable from '@/app/ui/flights/table';
import Search from '@/app/ui/search';
import { CreateFlight } from '@/app/ui/flights/buttons';
import { FlightsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';


export default function Page() {
    return (
        <div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search flights..." />
                <CreateFlight />
            </div>
            <Suspense fallback={<FlightsTableSkeleton/>}>
                <FlightsTable />
            </Suspense>
        </div>
    );
}