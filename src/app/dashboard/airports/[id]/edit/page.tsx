import EditForm from "@/app/ui/util_components/edit-airport-form";
import Breadcrumbs from "@/app/ui/util_components/breadcrumbs";
import { fetchAirportById} from "@/app/lib/data-acfl";
import { Suspense } from "react";

import { FormSkeleton } from "@/app/ui/skeletons";


export default async function Page(props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const id = params.id

    const data = await fetchAirportById(id)
    const airport = data[0]
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Airports", href: "/dashboard/airports" },
                    { label: "Update Airport", href: `/dashboard/airports/${id}/edit`, 
                    active: true 
                },
                ]}
            />
            <Suspense fallback={<FormSkeleton />}>
                <EditForm airport={airport} />
            </Suspense>
                
        </main>
    );
}
