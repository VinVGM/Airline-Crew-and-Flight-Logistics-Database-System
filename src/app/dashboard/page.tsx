import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'ACFL-DBS Dashboard - Overview of flight operations, active flights, and airports',
  openGraph: {
    title: 'Dashboard - ACFL-DBS',
    description: 'ACFL-DBS Dashboard - Overview of flight operations, active flights, and airports',
    images: ['/meta.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dashboard - ACFL-DBS',
    description: 'ACFL-DBS Dashboard - Overview of flight operations, active flights, and airports',
    images: ['/meta.png'],
  },
};

export const dynamic = "force-dynamic";

import FlightSchedulesTable from "@/app/ui/schedules/table";
import { Globe } from "@/components/ui/globe";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchAirports, fetchOnTimeFlights } from "../lib/data-acfl";

export default async function Page() {
  const activeFlights = await fetchOnTimeFlights();
  const activeAirports = await fetchAirports("", 1);
  return (
    <div className="min-h-screen p-4">
      <div className="grid gap-2 sm:gap-6 grid-cols-1 sm:grid-cols-2 h-full">
        <div className="flex flex-col gap-6">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Currently Active Flights</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 rounded-lg overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold text-gray-700">
                          Flight No
                        </th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-700">
                          Origin
                        </th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-700">
                          Destination
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {activeFlights?.map((flight) => (
                        <tr key={flight.flight_id}>
                          <td className="px-4 py-2">{flight.flight_no}</td>
                          <td className="px-4 py-2">{flight.origin_code}</td>
                          <td className="px-4 py-2">
                            {flight.destination_code}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Active Airports</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 rounded-lg overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold text-gray-700">
                          Airport Code
                        </th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-700">
                          Name
                        </th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-700">
                          Country
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {activeAirports?.map((airport) => (
                        <tr key={airport.airport_id}>
                          <td className="px-4 py-2">{airport.code}</td>
                          <td className="px-4 py-2">{airport.name}</td>
                          <td className="px-4 py-2">{airport.country}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>
        <div className="row-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Overview of Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
                <Globe className="h-full w-full" />
                <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
              </div>
            </CardContent>

            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
