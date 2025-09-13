import Form from "@/app/ui/invoices/create-schedule-form";

import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { Suspense } from "react";
import { FormSkeleton } from "@/app/ui/skeletons";
import { fetchCrews, fetchFlights } from "@/app/lib/data-acfl";
export default async function Page() {

    const [crews, flights] = await Promise.all([
        fetchCrews(),
        fetchFlights()
    ]);

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Schedules", href: "/dashboard/schedules" },
                    { label: "Create Schedule", href: "/dashboard/schedules/create", active: true },
                ]}
            />
            <Suspense fallback={<FormSkeleton />}>
                 <Form crews={crews} flights={flights} />
            </Suspense>
        </main>
    );
}