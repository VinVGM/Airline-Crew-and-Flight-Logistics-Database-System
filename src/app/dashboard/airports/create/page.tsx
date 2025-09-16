import Form from "@/app/ui/util_components/create-airport-form";

import Breadcrumbs from "@/app/ui/util_components/breadcrumbs";
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