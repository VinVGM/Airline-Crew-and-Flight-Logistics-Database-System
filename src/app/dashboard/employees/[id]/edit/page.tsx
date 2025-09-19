import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Employee',
};

import EditForm from "@/app/ui/util_components/edit-employee-form";
import Breadcrumbs from "@/app/ui/util_components/breadcrumbs";
import { fetchEmployeeById} from "@/app/lib/data-acfl";
import { Suspense } from "react";

import { FormSkeleton } from "@/app/ui/skeletons";


export default async function Page(props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const id = params.id

    const data = await fetchEmployeeById(id)
    const employee = data[0]
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Employees", href: "/dashboard/employees" },
                    { label: "Update Employee", href: `/dashboard/employees/${id}/edit`, 
                    active: true 
                },
                ]}
            />
            <Suspense fallback={<FormSkeleton />}>
                <EditForm employee={employee} />
            </Suspense>
                
        </main>
    );
}