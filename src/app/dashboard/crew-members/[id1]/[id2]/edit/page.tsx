

import Form from "@/app/ui/crew-members/edit-form";
import Breadcrumbs from "@/app/ui/util_components/breadcrumbs";
import { fetchCrewMemberById, fetchCrews, fetchEmployeeById, fetchEmployees} from "@/app/lib/data-acfl";
import { Suspense } from "react";
import { createCrewMember } from "@/app/lib/actions";
import { FormSkeleton } from "@/app/ui/skeletons";


export default async function Page(props: { params: Promise<{ id1: string , id2: string}>}) {


    const params = await props.params;
    const id1 = params.id1
    const id2 = params.id2

    const employees = await fetchEmployees();
    const crews = await fetchCrews();

    const crew_member = (await fetchCrewMemberById(id1, id2))[0]

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Crews", href: "/dashboard/crews" },
            { label: "Edit Crew Member", href: `/dashboard/crews/${id1}//${id2}/edit` },
          ]}
        />

        <Suspense fallback={<FormSkeleton />}>
          <Form crews={crews} employees={employees} crew_member={crew_member}/>
        </Suspense>
      </main>
    );
}