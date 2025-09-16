import { Suspense } from "react";
import Breadcrumbs from "../../../../ui/util_components/breadcrumbs";

import { FormSkeleton } from "../../../../ui/skeletons";
import Form from "@/app/ui/crews/form";
import { fetchCrewbyId } from "@/app/lib/data-acfl";
export default async function Page(props : {params : Promise<{id:string}>}) {
    const params = await props.params;
    const id = params.id


    const data = await fetchCrewbyId(id);
    const crew = data[0];
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={
                    [
                        {label: "Crews", href: "/dashboard/crews"},
                        {label: "Edit Crew", href: `/dashboard/crews/${id}/edit`}
                    ]
                }
            />
            
            <Suspense fallback={<FormSkeleton/>}>
                <Form crew ={crew} />
            </Suspense>

        </main>
    );
}