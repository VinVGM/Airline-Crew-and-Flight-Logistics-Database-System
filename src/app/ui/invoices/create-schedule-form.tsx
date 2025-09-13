"use client";

import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { createFlightSchedule } from '@/app/lib/actions';
import { useActionState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function FlightScheduleForm() {
    const [errorMessage, formAction] = useActionState(
        async (_state: string | undefined, formData: FormData) => {
            return await createFlightSchedule(formData);
        },
        undefined
    );

    return (
        <form action={formAction}>
            <div className='rounded-md bg-gray-50 p-4 md:p-6'>
                <div className='mb-4'>
                    <label htmlFor='crew_id' className='mb-2 block text-s font-medium'>Crew ID</label>
                    <input
                        type='text'
                        id='crew_id'
                        name='crew_id'
                        placeholder='Enter Crew ID'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='flight_id' className='mb-2 block text-s font-medium'>Flight ID</label>
                    <input
                        type='text'
                        id='flight_id'
                        name='flight_id'
                        placeholder='Enter Flight ID'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='arrival_time' className='mb-2 block text-s font-medium'>Arrival Time</label>
                    <input
                        type='datetime-local'
                        id='arrival_time'
                        name='arrival_time'
                        placeholder='Select Arrival Time'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='departure_time' className='mb-2 block text-s font-medium'>Departure Time</label>
                    <input
                        type='datetime-local'
                        id='departure_time'
                        name='departure_time'
                        placeholder='Select Departure Time'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='date' className='mb-2 block text-s font-medium'>Date</label>
                    <input
                        type='date'
                        id='date'
                        name='date'
                        placeholder='Select Date'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        required
                    />
                </div>

                <div className='flex justify-end gap-4 mt-6'>
                    <Link href="/dashboard/flight-schedules" className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200'>Cancel</Link>
                    <Button type='submit'>Create Flight Schedule</Button>
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
