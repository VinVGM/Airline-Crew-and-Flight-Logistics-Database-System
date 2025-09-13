import { Aircraft } from '@/app/lib/definitions-acpl';
import { fetchAircrafts } from '@/app/lib/data-acfl';

import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

export default async function AircraftsTable() {
  // const aircrafts: Aircraft[] = await fetchAircrafts();

  const aircrafts: Aircraft[] = [
    {
      aircraft_id: '1',
      user_id: '1',
      model: 'Boeing 737',
      manufacturer: 'Boeing',
      capacity: 180,
      maintenance_status: 'Operational',
      created_at: '2015-06-01',
    },
    {
      aircraft_id: '2',
      user_id: '2',
      model: 'Airbus A320',
      manufacturer: 'Airbus',
      capacity: 160,
      maintenance_status: 'Under Maintenance',
      created_at: '2018-09-15',
    },
  ];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile View */}
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
                    <p className="text-xs text-gray-400">
                      Aircraft ID: {aircraft.aircraft_id}
                    </p>
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
                      Added: {aircraft.created_at}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800" title="Update">
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-800" title="Delete">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Aircraft ID</th>
                <th className="px-3 py-5 font-medium">Model</th>
                <th className="px-3 py-5 font-medium">Manufacturer</th>
                <th className="px-3 py-5 font-medium">Capacity</th>
                <th className="px-3 py-5 font-medium">Status</th>
                <th className="px-3 py-5 font-medium">Added</th>
                <th className="px-3 py-5 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {aircrafts?.map((aircraft) => (
                <tr
                  key={aircraft.aircraft_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none 
                    [&:first-child>td:first-child]:rounded-tl-lg 
                    [&:first-child>td:last-child]:rounded-tr-lg 
                    [&:last-child>td:first-child]:rounded-bl-lg 
                    [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">{aircraft.aircraft_id}</td>
                  <td className="whitespace-nowrap px-3 py-3">{aircraft.model}</td>
                  <td className="whitespace-nowrap px-3 py-3">{aircraft.manufacturer}</td>
                  <td className="whitespace-nowrap px-3 py-3">{aircraft.capacity}</td>
                  <td className="whitespace-nowrap px-3 py-3">{aircraft.maintenance_status}</td>
                  <td className="whitespace-nowrap px-3 py-3">{aircraft.created_at}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800" title="Update">
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-800" title="Delete">
                        <TrashIcon className="h-5 w-5" />
                      </button>
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
