import Form from "@/app/ui/invoices/create-aircraft-form";

import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { Suspense } from "react";
import { FormSkeleton } from "@/app/ui/skeletons";
export default function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Aircrafts", href: "/dashboard/aircrafts" },
                    { label: "Create Aircraft", href: "/dashboard/aircrafts/create", active: true },
                ]}
            />
            <Suspense fallback={<FormSkeleton />}>
                 <Form/>
            </Suspense>
        </main>
    );
}