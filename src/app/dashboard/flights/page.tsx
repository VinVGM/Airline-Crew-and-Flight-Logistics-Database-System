import FlightsTable from '@/app/ui/flights/table';
import Search from '@/app/ui/search';
import { CreateFlight } from '@/app/ui/flights/buttons';
import { FlightsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import Pagination from '@/app/ui/util_components/pagination';
import { fetchFlights } from '@/app/lib/data-acfl';
import { fetchFlightsPages } from '@/app/lib/data-acfl';

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
    const totalPages = await fetchFlightsPages(query);

    return (
        <div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search flights..." />
                <CreateFlight />
            </div>
            <Suspense fallback={<FlightsTableSkeleton/>}>
                <FlightsTable query={query} currentPage={currentPage} />
            </Suspense>

            <div className='mt-5 flex w-full justify-center'>
                <Pagination totalPages={totalPages}/>
            </div>
        </div>
    );
}