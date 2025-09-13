import { Crew } from '@/app/lib/definitions-acpl';
import { fetchCrews } from '@/app/lib/data-acfl';

import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { DeleteCrew, UpdateCrew } from './buttons';

export default async function CrewsTable({
    query,
    currentPage,
  }:{
    query: string;
    currentPage: number
  }) {
  const crews = await fetchCrews(query, currentPage);


  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {crews?.map((crew) => (
              <div
                key={crew.crew_id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Crew ID: {crew.crew_id}</p>
                    <p className="text-xs text-gray-500">{crew.crew_name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">
                      Created: {crew.created_at}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <UpdateCrew id={crew.crew_id} />
                  <DeleteCrew id={crew.crew_id} />
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Crew ID</th>
                <th className="px-3 py-5 font-medium">Crew Name</th>
                <th className="px-3 py-5 font-medium">Created</th>
                <th className="px-3 py-5 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {crews?.map((crew) => (
                <tr
                  key={crew.crew_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {crew.crew_id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {crew.crew_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {crew.created_at}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex gap-2">
                      <UpdateCrew id={crew.crew_id} />
                      <DeleteCrew id={crew.crew_id} />
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