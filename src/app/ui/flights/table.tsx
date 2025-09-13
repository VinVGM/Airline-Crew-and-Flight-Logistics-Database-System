import { Flight } from '@/app/lib/definitions-acpl';
import { fetchFlights } from '@/app/lib/data-acfl';

import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

export default async function FlightsTable() {
  // const flights: Flight[] = await fetchFlights();

  const flights: Flight[] = [
    {
      flight_id: '1',
      user_id: '1',
      flight_no: 'AI101',
      status: 'Scheduled',
      aircraft_id: 'A1',
      origin_airport_id: 'JFK',
      destination_airport_id: 'LHR',
      created_at: '2024-09-01',
    },
    {
      flight_id: '2',
      user_id: '2',
      flight_no: 'BA202',
      status: 'Departed',
      aircraft_id: 'A2',
      origin_airport_id: 'LHR',
      destination_airport_id: 'DXB',
      created_at: '2024-09-02',
    },
  ];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile View */}
          <div className="md:hidden">
            {flights?.map((flight) => (
              <div
                key={flight.flight_id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{flight.flight_no}</p>
                    <p className="text-sm text-gray-500">{flight.status}</p>
                    <p className="text-xs text-gray-400">
                      Flight ID: {flight.flight_id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">
                      Aircraft: {flight.aircraft_id}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>
                      From: <span className="font-medium">{flight.origin_airport_id}</span>
                    </p>
                    <p>
                      To: <span className="font-medium">{flight.destination_airport_id}</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      Created: {flight.created_at}
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
                <th className="px-4 py-5 font-medium sm:pl-6">Flight ID</th>
                <th className="px-3 py-5 font-medium">Flight No</th>
                <th className="px-3 py-5 font-medium">Status</th>
                <th className="px-3 py-5 font-medium">Aircraft</th>
                <th className="px-3 py-5 font-medium">From</th>
                <th className="px-3 py-5 font-medium">To</th>
                <th className="px-3 py-5 font-medium">Created</th>
                <th className="px-3 py-5 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {flights?.map((flight) => (
                <tr
                  key={flight.flight_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none 
                    [&:first-child>td:first-child]:rounded-tl-lg 
                    [&:first-child>td:last-child]:rounded-tr-lg 
                    [&:last-child>td:first-child]:rounded-bl-lg 
                    [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">{flight.flight_id}</td>
                  <td className="whitespace-nowrap px-3 py-3">{flight.flight_no}</td>
                  <td className="whitespace-nowrap px-3 py-3">{flight.status}</td>
                  <td className="whitespace-nowrap px-3 py-3">{flight.aircraft_id}</td>
                  <td className="whitespace-nowrap px-3 py-3">{flight.origin_airport_id}</td>
                  <td className="whitespace-nowrap px-3 py-3">{flight.destination_airport_id}</td>
                  <td className="whitespace-nowrap px-3 py-3">{flight.created_at}</td>
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
