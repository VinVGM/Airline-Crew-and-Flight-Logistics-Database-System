"use client";

import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { createAirport } from '@/app/lib/actions';
import { useActionState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function AirportForm() {
    const [errorMessage, formAction] = useActionState(
        async (_state: string | undefined, formData: FormData) => {
            return await createAirport(formData);
        },
        undefined
    );

    return (
        <form action={formAction}>
            <div className='rounded-md bg-gray-50 p-4 md:p-6'>
                <div className='mb-4'>
                    <label htmlFor='code' className='mb-2 block text-s font-medium'>Airport Code</label>
                    <input
                        type='text'
                        id='code'
                        name='code'
                        placeholder='Enter Airport Code'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='name' className='mb-2 block text-s font-medium'>Airport Name</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        placeholder='Enter Airport Name'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='city' className='mb-2 block text-s font-medium'>City</label>
                    <input
                        type='text'
                        id='city'
                        name='city'
                        placeholder='Enter City'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='country' className='mb-2 block text-s font-medium'>Country</label>
                    <input
                        type='text'
                        id='country'
                        name='country'
                        placeholder='Enter Country'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        required
                    />
                </div>

                <div className='flex justify-end gap-4 mt-6'>
                    <Link href="/dashboard/airports" className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200'>Cancel</Link>
                    <Button type='submit'>Create Airport</Button>
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
