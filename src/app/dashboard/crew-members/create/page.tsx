import Form from "@/app/ui/crew-members/form";

import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { Suspense } from "react";
import { FormSkeleton } from "@/app/ui/skeletons";
import { fetchCrews, fetchEmployees } from "@/app/lib/data-acfl";


export default async function Page() {

    const crews = await fetchCrews()

    const employees = await fetchEmployees()
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Crew Members", href: "/dashboard/crew-members" },
                    { label: "Create Crew Member", href: "/dashboard/crew-members/create", active: true },
                ]}
            />
            <Suspense fallback={<FormSkeleton />}>
                 <Form crews={crews} employees={employees}/>
            </Suspense>
        </main>
    );
}