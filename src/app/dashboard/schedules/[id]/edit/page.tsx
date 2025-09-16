import EditForm from "@/app/ui/util_components/edit-schedule-form";
import Breadcrumbs from "@/app/ui/util_components/breadcrumbs";
import { fetchFlightScheduleById, fetchCrews, fetchFlights} from "@/app/lib/data-acfl";
import { Suspense } from "react";

import { FormSkeleton } from "@/app/ui/skeletons";


export default async function Page(props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const id = params.id

    const [data, crews, flights] = await Promise.all([
        fetchFlightScheduleById(id),
        fetchCrews('', 1), // Get all crews for dropdown
        fetchFlights('', 1) // Get all flights for dropdown
    ]);
    
    const schedule = data[0]
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Schedules", href: "/dashboard/schedules" },
                    { label: "Update Schedule", href: `/dashboard/schedules/${id}/edit`, 
                    active: true 
                },
                ]}
            />
            <Suspense fallback={<FormSkeleton />}>
                <EditForm schedule={schedule} crews={crews} flights={flights} />
            </Suspense>
                
        </main>
    );
}
