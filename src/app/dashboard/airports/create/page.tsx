import Form from "@/app/ui/invoices/create-airport-form";

import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { Suspense } from "react";
import { FormSkeleton } from "@/app/ui/skeletons";
export default function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Airports", href: "/dashboard/airports" },
                    { label: "Create Airport", href: "/dashboard/airports/create", active: true },
                ]}
            />
            <Suspense fallback={<FormSkeleton />}>
                 <Form/>
            </Suspense>
        </main>
    );
}