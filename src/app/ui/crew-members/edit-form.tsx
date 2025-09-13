
'use client'

import EditForm from "@/app/ui/invoices/edit-employee-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import {
  fetchCrews,
  fetchEmployeeById,
  fetchEmployees,
} from "@/app/lib/data-acfl";
import { Suspense } from "react";
import { createCrewMember } from "@/app/lib/actions";
import { FormSkeleton } from "@/app/ui/skeletons";
import { useActionState } from "react";
import { CrewMember, Employee } from "@/app/lib/definitions-acpl";
import { Crew } from "@/app/lib/definitions-acpl";

import Link from "next/link";

import { UserCircleIcon } from "@heroicons/react/24/outline";

import { Button } from "../button";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";


export default function Form({crews, employees, crew_member} : {crews: Crew[], employees: Employee[], crew_member: CrewMember}) {

    const [errorMessage, formAction] = useActionState(
        async (_state: string | undefined, formData: FormData) => {
          return await createCrewMember(formData);
        },
        undefined
    );

    


    return (
      <form action={formAction}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <div className="mb-4">
            <label htmlFor="customer" className="mb-2 block text-s font-medium">
              Choose Crew
            </label>
            <div className="relative">
              <select
                id="crew"
                name="crewId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={crew_member.crew_id}
              >
                <option value="" disabled>
                  Select a Crew
                </option>
                {crews.map((crew) => (
                  <option key={crew.crew_id} value={crew.crew_id}>
                    {crew.crew_name}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div className="flex gap-2 mt-4 text-xs">
              <p className="text-gray-500">Need to create a new Crew?</p>
              <Link href="/dashboard/crews/create" className="text-blue-400">
                Click here
              </Link>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="customer" className="mb-2 block text-s font-medium">
              Choose Employee
            </label>
            <div className="relative">
              <select
                id="employee"
                name="employeeId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={crew_member.employee_id}
              >
                <option value="" disabled>
                  Select a Employee
                </option>
                {employees.map((emp) => (
                  <option key={emp.employee_id} value={emp.employee_id}>
                    {emp.employee_id} : {emp.name}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-s, font-medium">
              Enter Role
            </label>
            <div className="relative mt-2 rounded-md">
              <input
                type="text"
                id="role"
                name="role"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Lead Purser"
                defaultValue={crew_member.role}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Link
              href="/dashboard/employees"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link>
            <Button type="submit">Create Employee</Button>
          </div>

          <div className="flex h-8 items-end space-x-1">
            {errorMessage && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
        </div>
      </form>
    );
}