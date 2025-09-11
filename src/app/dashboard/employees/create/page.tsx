import Form from "@/app/ui/invoices/create-employee-form";

import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";


export default function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Employees", href: "/dashboard/employees" },
                    { label: "Create Employee", href: "/dashboard/employees/create", active: true },
                ]}
            />
            <Form />
        </main>
    );
}