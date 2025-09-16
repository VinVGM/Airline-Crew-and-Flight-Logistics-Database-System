import Form from "@/app/ui/util_components/create-flight-form";

import Breadcrumbs from "@/app/ui/util_components/breadcrumbs";
import { Suspense } from "react";
import { FormSkeleton } from "@/app/ui/skeletons";
import { fetchAircrafts, fetchAirports } from "@/app/lib/data-acfl";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {

    const [aircrafts, airports] = await Promise.all([
        fetchAircrafts('', 1), // Get all aircrafts for dropdown
        fetchAirports('', 1)   // Get all airports for dropdown
    ]);

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Flights", href: "/dashboard/flights" },
                    { label: "Create Flight", href: "/dashboard/flights/create", active: true },
                ]}
            />
            <Suspense fallback={<FormSkeleton />}>
                 <Form aircrafts={aircrafts} airports={airports} />
            </Suspense>
        </main>
    );
}