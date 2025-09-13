import { fetchAircrafts } from '@/app/lib/data-acfl';


import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { DeleteAircraft, UpdateAircraft } from './buttons';
export default async function AircraftsTable() {
  const aircrafts = await fetchAircrafts();




  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {aircrafts?.map((aircraft) => (
              <div
                key={aircraft.aircraft_id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{aircraft.model}</p>
                    <p className="text-sm text-gray-500">{aircraft.manufacturer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">
                      Capacity: {aircraft.capacity}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>
                      Status: <span className="font-medium">{aircraft.maintenance_status}</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      Created: {aircraft.created_at}
                    </p>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Model</th>
                <th className="px-3 py-5 font-medium">Manufacturer</th>
                <th className="px-3 py-5 font-medium">Capacity</th>
                <th className="px-3 py-5 font-medium">Maintenance Status</th>
                <th className="px-3 py-5 font-medium">Created</th>
                <th className="px-3 py-5 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {aircrafts?.map((aircraft) => (
                <tr
                  key={aircraft.aircraft_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">{aircraft.model}</td>
                  <td className="whitespace-nowrap px-3 py-3">{aircraft.manufacturer}</td>
                  <td className="whitespace-nowrap px-3 py-3">{aircraft.capacity}</td>
                  <td className="whitespace-nowrap px-3 py-3">{aircraft.maintenance_status}</td>
                  <td className="whitespace-nowrap px-3 py-3">{aircraft.created_at}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex gap-2">
                      <UpdateAircraft id={aircraft.aircraft_id}/>
                      <DeleteAircraft id={aircraft.aircraft_id}/>
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