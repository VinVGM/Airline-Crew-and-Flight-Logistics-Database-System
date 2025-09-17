import AircraftsTable from '@/app/ui/aircrafts/table';
import Search from '@/app/ui/search';
import { CreateAircraft } from '@/app/ui/aircrafts/buttons';
import { AircraftsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import Pagination from '@/app/ui/util_components/pagination';
import { fetchAircrafts } from '@/app/lib/data-acfl';
import { fetchAircraftsPages } from '@/app/lib/data-acfl';
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
    const totalPages = await fetchAircraftsPages(query);

    return (
        <div>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Aircrafts', href: '/dashboard/aircrafts', active: true },
                ]}
            />
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search aircrafts..." />
                <CreateAircraft />
            </div>
            <Suspense key={query + currentPage} fallback={<AircraftsTableSkeleton/>}>
                <AircraftsTable query={query} currentPage={currentPage} />
            </Suspense>

            <div className='mt-5 flex w-full justify-center'>
                <Pagination totalPages={totalPages}/>
            </div>
        </div>
    );
}