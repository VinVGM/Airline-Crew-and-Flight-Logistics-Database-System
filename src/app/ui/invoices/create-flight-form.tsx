"use client";

import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { createFlight } from '@/app/lib/actions';
import { useActionState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function FlightForm() {
    const [errorMessage, formAction] = useActionState(
        async (_state: string | undefined, formData: FormData) => {
            return await createFlight(formData);
        },
        undefined
    );

    return (
        <form action={formAction}>
            <div className='rounded-md bg-gray-50 p-4 md:p-6'>
                <div className='mb-4'>
                    <label htmlFor='flight_no' className='mb-2 block text-s font-medium'>Flight Number</label>
                    <input
                        type='text'
                        id='flight_no'
                        name='flight_no'
                        placeholder='Enter Flight Number'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='status' className='mb-2 block text-s font-medium'>Status</label>
                    <input
                        type='text'
                        id='status'
                        name='status'
                        placeholder='Enter Status'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='aircraft_id' className='mb-2 block text-s font-medium'>Aircraft ID</label>
                    <input
                        type='text'
                        id='aircraft_id'
                        name='aircraft_id'
                        placeholder='Enter Aircraft ID'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='origin_airport_id' className='mb-2 block text-s font-medium'>Origin Airport ID</label>
                    <input
                        type='text'
                        id='origin_airport_id'
                        name='origin_airport_id'
                        placeholder='Enter Origin Airport ID'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='destination_airport_id' className='mb-2 block text-s font-medium'>Destination Airport ID</label>
                    <input
                        type='text'
                        id='destination_airport_id'
                        name='destination_airport_id'
                        placeholder='Enter Destination Airport ID'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        required
                    />
                </div>

                <div className='flex justify-end gap-4 mt-6'>
                    <Link href="/dashboard/flights" className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200'>Cancel</Link>
                    <Button type='submit'>Create Flight</Button>
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
