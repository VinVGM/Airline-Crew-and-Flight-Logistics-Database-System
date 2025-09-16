import EditForm from "@/app/ui/util_components/edit-aircraft-form";
import Breadcrumbs from "@/app/ui/util_components/breadcrumbs";
import { fetchAircraftById} from "@/app/lib/data-acfl";
import { Suspense } from "react";

import { FormSkeleton } from "@/app/ui/skeletons";


export default async function Page(props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const id = params.id

    const data = await fetchAircraftById(id)
    const aircraft = data[0]
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Aircrafts", href: "/dashboard/aircrafts" },
                    { label: "Update Aircraft", href: `/dashboard/aircrafts/${id}/edit`, 
                    active: true 
                },
                ]}
            />
            <Suspense fallback={<FormSkeleton />}>
                <EditForm aircraft={aircraft} />
            </Suspense>
                
        </main>
    );
}
