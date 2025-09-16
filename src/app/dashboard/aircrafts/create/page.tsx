import Form from "@/app/ui/util_components/create-aircraft-form";

import Breadcrumbs from "@/app/ui/util_components/breadcrumbs";
import { Suspense } from "react";
import { FormSkeleton } from "@/app/ui/skeletons";
export const dynamic = 'force-dynamic';
export const revalidate = 0;
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