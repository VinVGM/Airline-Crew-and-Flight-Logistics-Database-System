import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Flight',
};

import EditForm from "@/app/ui/util_components/edit-flight-form";
import Breadcrumbs from "@/app/ui/util_components/breadcrumbs";
import { fetchFlightById, fetchAircrafts, fetchAirports} from "@/app/lib/data-acfl";
import { Suspense } from "react";

import { FormSkeleton } from "@/app/ui/skeletons";


export default async function Page(props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const id = params.id

    const [data, aircrafts, airports] = await Promise.all([
        fetchFlightById(id),
        fetchAircrafts('', 1), // Get all aircrafts for dropdown
        fetchAirports('', 1)   // Get all airports for dropdown
    ]);
    
    const flight = data[0]
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Flights", href: "/dashboard/flights" },
                    { label: "Update Flight", href: `/dashboard/flights/${id}/edit`, 
                    active: true 
                },
                ]}
            />
            <Suspense fallback={<FormSkeleton />}>
                <EditForm flight={flight} aircrafts={aircrafts} airports={airports} />
            </Suspense>
                
        </main>
    );
}
