"use client";

import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { createAircraft } from '@/app/lib/actions';
import { useActionState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function AircraftForm() {
    const [errorMessage, formAction] = useActionState(
        async (_state: string | undefined, formData: FormData) => {
            return await createAircraft(formData);
        },
        undefined
    );

    return (
        <form action={formAction}>
            <div className='rounded-md bg-gray-50 p-4 md:p-6'>
                <div className='mb-4'>
                    <label htmlFor='model' className='mb-2 block text-s font-medium'>Model</label>
                    <input
                        type='text'
                        id='model'
                        name='model'
                        placeholder='Boeing 737'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor='manufacturer' className='mb-2 block text-s font-medium'>Manufacturer</label>
                    <input
                        type='text'
                        id='manufacturer'
                        name='manufacturer'
                        placeholder='Boeing'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor='capacity' className='mb-2 block text-s font-medium'>Capacity</label>
                    <input
                        type='number'
                        id='capacity'
                        name='capacity'
                        placeholder='180'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor='maintenance_status' className='mb-2 block text-s font-medium'>Maintenance Status</label>
                    <input
                        type='text'
                        id='maintenance_status'
                        name='maintenance_status'
                        placeholder='Operational'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        required
                    />
                </div>

                <div className='flex justify-end gap-4 mt-6'>
                    <Link
                        href="/dashboard/aircrafts"
                        className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200'
                    >
                        Cancel
                    </Link>
                    <Button type='submit'>Create Aircraft</Button>
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
