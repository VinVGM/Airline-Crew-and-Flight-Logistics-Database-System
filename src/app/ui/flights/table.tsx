import { fetchFlights } from '@/app/lib/data-acfl';


import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { DeleteFlight, UpdateFlight } from './buttons';
export default async function FlightsTable({
    query,
    currentPage,
  }:{
    query: string;
    currentPage: number
  }) {
  const flights = await fetchFlights(query, currentPage);




  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {flights?.map((flight) => (
              <div
                key={flight.flight_id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{flight.flight_no}</p>
                    <p className="text-sm text-gray-500">Status: {flight.status}</p>
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
                      Route: <span className="font-medium">{flight.origin_airport_id} → {flight.destination_airport_id}</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      Created: {flight.created_at}
                    </p>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Flight No</th>
                <th className="px-3 py-5 font-medium">Status</th>
                <th className="px-3 py-5 font-medium">Aircraft</th>
                <th className="px-3 py-5 font-medium">Origin</th>
                <th className="px-3 py-5 font-medium">Destination</th>
                <th className="px-3 py-5 font-medium">Created</th>
                <th className="px-3 py-5 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {flights?.map((flight) => (
                <tr
                  key={flight.flight_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">{flight.flight_no}</td>
                  <td className="whitespace-nowrap px-3 py-3">{flight.status}</td>
                  <td className="whitespace-nowrap px-3 py-3">{flight.aircraft_id}</td>
                  <td className="whitespace-nowrap px-3 py-3">{flight.origin_airport_id}</td>
                  <td className="whitespace-nowrap px-3 py-3">{flight.destination_airport_id}</td>
                  <td className="whitespace-nowrap px-3 py-3">{flight.created_at}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex gap-2">
                      <UpdateFlight id={flight.flight_id}/>
                      <DeleteFlight id={flight.flight_id}/>
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