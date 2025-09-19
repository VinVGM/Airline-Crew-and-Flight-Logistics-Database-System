import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crews',
};

import Search from "@/app/ui/search";
import CrewsTable from "@/app/ui/crews/table";
import { CreateCrew } from "@/app/ui/crews/buttons";
import { Suspense } from "react";
import { CrewsTableSkeleton } from "@/app/ui/skeletons";
import Pagination from '@/app/ui/util_components/pagination';
import { fetchCrews } from '@/app/lib/data-acfl';
import { fetchCrewsPages } from '@/app/lib/data-acfl';

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
    const totalPages = await fetchCrewsPages(query);

    return (
        <div>
            <div className='flex items-center justify-between gap-2 mt-4 md:mt-8'>
                <Search placeholder='Search Crew'/>
                <CreateCrew/>
            </div>
            <Suspense fallback={<CrewsTableSkeleton/>}>
                <CrewsTable query={query} currentPage={currentPage} />
            </Suspense>

            <div className='mt-5 flex w-full justify-center'>
                <Pagination totalPages={totalPages}/>
            </div>
        </div>
    );
}