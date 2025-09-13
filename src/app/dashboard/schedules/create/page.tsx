import Form from "@/app/ui/invoices/create-schedule-form";

import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { Suspense } from "react";
import { FormSkeleton } from "@/app/ui/skeletons";
export default function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Flight Schedules", href: "/dashboard/schedules" },
                    { label: "Create Flight Schedule", href: "/dashboard/employees/schedules", active: true },
                ]}
            />
            <Suspense fallback={<FormSkeleton />}>
                 <Form/>
            </Suspense>
        </main>
    );
}