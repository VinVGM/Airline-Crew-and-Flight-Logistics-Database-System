
import EmployeesTable from '@/app/ui/employees/table';
import Search from '@/app/ui/search';
import { CreateEmployee } from '@/app/ui/employees/buttons';
import { EmployeesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';


export default function Page() {
    return (
        <div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search employees..." />
                <CreateEmployee />
            </div>
            <Suspense fallback={<EmployeesTableSkeleton/>}>
                <EmployeesTable />
            </Suspense>
        </div>
    );
}