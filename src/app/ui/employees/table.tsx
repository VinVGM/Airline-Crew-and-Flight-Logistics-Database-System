import { fetchEmployees } from '@/app/lib/data-acfl';


import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { DeleteEmployee, UpdateEmployee } from './buttons';
export default async function EmployeesTable() {
  const employees = await fetchEmployees();


  


  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {employees?.map((employee) => (
              <div
                key={employee.employee_id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-sm text-gray-500">{employee.designation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">
                      DOB: {employee.dob}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>
                      Experience: <span className="font-medium">{employee.experience} yrs</span>
                    </p>
                    {employee.license_number && (
                      <p>License: {employee.license_number}</p>
                    )}
                    <p className="text-xs text-gray-400">
                      Joined: {employee.created_at}
                    </p>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Name</th>
                <th className="px-3 py-5 font-medium">Designation</th>
                <th className="px-3 py-5 font-medium">DOB</th>
                <th className="px-3 py-5 font-medium">Experience</th>
                <th className="px-3 py-5 font-medium">License Number</th>
                <th className="px-3 py-5 font-medium">Joined</th>
                <th className="px-3 py-5 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {employees?.map((employee) => (
                <tr
                  key={employee.employee_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">{employee.name}</td>
                  <td className="whitespace-nowrap px-3 py-3">{employee.designation}</td>
                  <td className="whitespace-nowrap px-3 py-3">{employee.dob}</td>
                  <td className="whitespace-nowrap px-3 py-3">{employee.experience} yrs</td>
                  <td className="whitespace-nowrap px-3 py-3">{employee.license_number || '-'}</td>
                  <td className="whitespace-nowrap px-3 py-3">{employee.created_at}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex gap-2">
                      <UpdateEmployee id={employee.employee_id}/>
                      <DeleteEmployee id={employee.employee_id}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}