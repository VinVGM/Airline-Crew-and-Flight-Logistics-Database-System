import { FlightSchedule } from '@/app/lib/definitions-acpl';
import { fetchFlightSchedules } from '@/app/lib/data-acfl';

import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

export default async function FlightSchedulesTable() {
  // const schedules: FlightSchedule[] = await fetchFlightSchedules();

  const schedules: FlightSchedule[] = [
    {
      schedule_id: '1',
      user_id: '1',
      crew_id: 'C1',
      flight_id: 'F1',
      arrival_time: '2024-09-10 T 18:30:00',
      departure_time: '2024-09-10 T 15:00:00',
      date: '2024-09-10',
      created_at: '2024-09-01',
    },
    {
      schedule_id: '2',
      user_id: '2',
      crew_id: 'C2',
      flight_id: 'F2',
      arrival_time: '2024-09-11 T 22:00:00',
      departure_time: '2024-09-11 T 19:00:00',
      date: '2024-09-11',
      created_at: '2024-09-02',
    },
  ];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile view */}
          <div className="md:hidden">
            {schedules?.map((schedule) => (
              <div
                key={schedule.schedule_id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Flight: {schedule.flight_id}</p>
                    <p className="text-sm text-gray-500">Crew: {schedule.crew_id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">
                      Date: {schedule.date}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>
                      Departure: <span className="font-medium">{schedule.departure_time}</span>
                    </p>
                    <p>
                      Arrival: <span className="font-medium">{schedule.arrival_time}</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      Created: {schedule.created_at}
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
          {/* Desktop/table view */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Flight</th>
                <th className="px-3 py-5 font-medium">Crew</th>
                <th className="px-3 py-5 font-medium">Date</th>
                <th className="px-3 py-5 font-medium">Departure</th>
                <th className="px-3 py-5 font-medium">Arrival</th>
                <th className="px-3 py-5 font-medium">Created</th>
                <th className="px-3 py-5 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {schedules?.map((schedule) => (
                <tr
                  key={schedule.schedule_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">{schedule.flight_id}</td>
                  <td className="whitespace-nowrap px-3 py-3">{schedule.crew_id}</td>
                  <td className="whitespace-nowrap px-3 py-3">{schedule.date}</td>
                  <td className="whitespace-nowrap px-3 py-3">{schedule.departure_time}</td>
                  <td className="whitespace-nowrap px-3 py-3">{schedule.arrival_time}</td>
                  <td className="whitespace-nowrap px-3 py-3">{schedule.created_at}</td>
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