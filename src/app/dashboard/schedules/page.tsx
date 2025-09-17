import SchedulesTable from '@/app/ui/schedules/table';
import Search from '@/app/ui/search';
import { CreateSchedule } from '@/app/ui/schedules/buttons';
import { SchedulesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import Pagination from '@/app/ui/util_components/pagination';
import { fetchFlightSchedules } from '@/app/lib/data-acfl';
import { fetchFlightSchedulesPages } from '@/app/lib/data-acfl';
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
    const totalPages = await fetchFlightSchedulesPages(query);

    return (
        <div>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Schedules', href: '/dashboard/schedules', active: true },
                ]}
            />
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search schedules..." />
                <CreateSchedule />
            </div>
            <Suspense key={query + currentPage} fallback={<SchedulesTableSkeleton/>}>
                <SchedulesTable query={query} currentPage={currentPage} />
            </Suspense>

            <div className='mt-5 flex w-full justify-center'>
                <Pagination totalPages={totalPages}/>
            </div>
        </div>
    );
}