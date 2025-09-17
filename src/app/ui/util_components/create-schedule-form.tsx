"use client";

import { SubmitButton } from '@/app/ui/submit-button';
import Link from 'next/link';
import { createFlightSchedule } from '@/app/lib/actions';
import { useActionState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import { Crew, Flight } from '@/app/lib/definitions-acpl';

export default function Form({ crews, flights }: { crews: Crew[], flights: Flight[] }) {

    const [errorMessage, formAction] = useActionState(
        async (_state: string | undefined, formData : FormData) => {
            return await createFlightSchedule(formData);
        },
        undefined
    )
    return (
        <form action={formAction}>
            <div className='rounded-md bg-gray-50 p-4 md:p-6'>
                <div className='mb-4'>
                    <label htmlFor='crew_id' className='mb-2 block text-s, font-medium'>
                        Select Crew
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <select
                            id='crew_id'
                            name='crew_id'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            required
                        >
                            <option value="">Select Crew</option>
                            {crews.map((crew) => (
                                <option key={crew.crew_id} value={crew.crew_id}>
                                    {crew.crew_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='mb-4'>
                    <label htmlFor='flight_id' className='mb-2 block text-s, font-medium'>
                        Select Flight
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <select
                            id='flight_id'
                            name='flight_id'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            required
                        >
                            <option value="">Select Flight</option>
                            {flights.map((flight) => (
                                <option key={flight.flight_id} value={flight.flight_id}>
                                    {flight.flight_no} - {flight.status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='mb-4'>
                    <label htmlFor='date' className='mb-2 block text-s, font-medium'>
                        Select Date
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <input
                            type='date'
                            id='date'
                            name='date'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            required
                        />
                    </div>
                </div>

                <div className='mb-4'>
                    <label htmlFor='departure_time' className='mb-2 block text-s, font-medium'>
                        Enter Departure Time
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <input
                            type='datetime-local'
                            id='departure_time'
                            name='departure_time'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            required
                        />
                    </div>
                </div>

                <div className='mb-4'>
                    <label htmlFor='arrival_time' className='mb-2 block text-s, font-medium'>
                        Enter Arrival Time
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <input
                            type='datetime-local'
                            id='arrival_time'
                            name='arrival_time'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            required
                        />
                    </div>
                </div>

                <div className='flex justify-end gap-4 mt-6'>
                    <Link
                        href= "/dashboard/schedules"
                        className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
                    >
                        Cancel
                    </Link>
                    <SubmitButton pendingText="Creating...">Create Schedule</SubmitButton>
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