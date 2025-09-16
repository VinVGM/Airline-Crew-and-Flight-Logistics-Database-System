
import EmployeesTable from '@/app/ui/employees/table';
import Search from '@/app/ui/search';
import { CreateEmployee } from '@/app/ui/employees/buttons';
import { EmployeesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import Pagination from '@/app/ui/util_components/pagination';
import { fetchEmployees } from '@/app/lib/data-acfl';
import { fetchEmployeesPages } from '@/app/lib/data-acfl';

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
    const totalPages = await fetchEmployeesPages(query);


    return (
        <div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search employees..." />
                <CreateEmployee />
            </div>
            <Suspense fallback={<EmployeesTableSkeleton/>}>
                <EmployeesTable query={query} currentPage={currentPage} />
            </Suspense>

            <div className='mt-5 flex w-full justify-center'>
                <Pagination totalPages={totalPages}/>
                    

            </div>
        </div>
    );
}