import AirportsTable from '@/app/ui/airports/table';
import Search from '@/app/ui/search';
import { CreateAirport } from '@/app/ui/airports/buttons';
import { AirportsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import Pagination from '@/app/ui/invoices/pagination';
import { fetchAirports } from '@/app/lib/data-acfl';
import { fetchAirportsPages } from '@/app/lib/data-acfl';

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
    const totalPages = await fetchAirportsPages(query);

    return (
        <div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search airports..." />
                <CreateAirport />
            </div>
            <Suspense fallback={<AirportsTableSkeleton/>}>
                <AirportsTable query={query} currentPage={currentPage} />
            </Suspense>

            <div className='mt-5 flex w-full justify-center'>
                <Pagination totalPages={totalPages}/>
            </div>
        </div>
    );
}