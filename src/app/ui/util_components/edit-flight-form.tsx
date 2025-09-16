"use client";

import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { updateFlight } from '@/app/lib/actions';
import { useActionState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Flight, Aircraft, Airport } from '@/app/lib/definitions-acpl';
interface EditFormProps {
    flight: Flight;
    aircrafts: Aircraft[];
    airports: Airport[];
}

export default function EditForm({ flight, aircrafts, airports }: EditFormProps) {

    const [errorMessage, formAction] = useActionState(
        async (_state: string | undefined, formData : FormData) => {
            return await updateFlight(formData, flight.flight_id);
        },
        undefined
    )
    return (
        <form action={formAction}>
            <div className='rounded-md bg-gray-50 p-4 md:p-6'>
                <div className='mb-4'>
                    <label htmlFor='flight_no' className='mb-2 block text-s, font-medium'>
                        Enter Flight Number
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <input
                            type='text'
                            id='flight_no'
                            name='flight_no'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            placeholder='AA123'
                            defaultValue={flight.flight_no}
                            required
                        />
                    </div>
                </div>
                <div className='mb-4'>
                    <label htmlFor='status' className='mb-2 block text-s, font-medium'>
                        Enter Flight Status
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <select
                            id='status'
                            name='status'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            defaultValue={flight.status}
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Boarding">Boarding</option>
                            <option value="Departed">Departed</option>
                            <option value="In Flight">In Flight</option>
                            <option value="Landed">Landed</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Delayed">Delayed</option>
                        </select>
                    </div>
                </div>

                <div className='mb-4'>
                    <label htmlFor='aircraft_id' className='mb-2 block text-s, font-medium'>
                        Select Aircraft
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <select
                            id='aircraft_id'
                            name='aircraft_id'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            defaultValue={flight.aircraft_id}
                            required
                        >
                            <option value="">Select Aircraft</option>
                            {aircrafts.map((aircraft) => (
                                <option key={aircraft.aircraft_id} value={aircraft.aircraft_id}>
                                    {aircraft.model} - {aircraft.manufacturer} (Capacity: {aircraft.capacity})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='mb-4'>
                    <label htmlFor='origin_airport_id' className='mb-2 block text-s, font-medium'>
                        Select Origin Airport
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <select
                            id='origin_airport_id'
                            name='origin_airport_id'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            defaultValue={flight.origin_airport_id}
                            required
                        >
                            <option value="">Select Origin Airport</option>
                            {airports.map((airport) => (
                                <option key={airport.airport_id} value={airport.airport_id}>
                                    {airport.code} - {airport.name} ({airport.city}, {airport.country})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='mb-4'>
                    <label htmlFor='destination_airport_id' className='mb-2 block text-s, font-medium'>
                        Select Destination Airport
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <select
                            id='destination_airport_id'
                            name='destination_airport_id'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            defaultValue={flight.destination_airport_id}
                            required
                        >
                            <option value="">Select Destination Airport</option>
                            {airports.map((airport) => (
                                <option key={airport.airport_id} value={airport.airport_id}>
                                    {airport.code} - {airport.name} ({airport.city}, {airport.country})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='flex justify-end gap-4 mt-6'>
                    <Link
                        href= "/dashboard/flights"
                        className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
                    >
                        Cancel
                    </Link>
                    <Button type='submit'>Update Flight</Button>
                </div>

                <div className='flex h-8 items-end space-x-1'>
                    {errorMessage && (
                        <>
                        <ExclamationCircleIcon className='h-5 w-5 text-red-500'/>
                        <p className='text-sm text-red-500'>{errorMessage}</p>
                        </>
                    )}
                </div>
            </div>
        </form>
    );
}
