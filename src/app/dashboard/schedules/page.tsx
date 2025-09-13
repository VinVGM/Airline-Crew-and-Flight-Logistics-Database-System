import SchedulesTable from '@/app/ui/schedules/table';
import Search from '@/app/ui/search';
import { CreateSchedule } from '@/app/ui/schedules/buttons';
import { SchedulesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';


export default function Page() {
    return (
        <div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search schedules..." />
                <CreateSchedule />
            </div>
            <Suspense fallback={<SchedulesTableSkeleton/>}>
                <SchedulesTable />
            </Suspense>
        </div>
    );
}