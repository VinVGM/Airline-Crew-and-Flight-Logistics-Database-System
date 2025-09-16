"use client";

import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { updateAirport } from '@/app/lib/actions';
import { useActionState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Airport } from '@/app/lib/definitions-acpl';

interface EditFormProps {
    airport: Airport;
}

export default function EditForm({ airport }: EditFormProps) {
    const [errorMessage, formAction] = useActionState(
        async (_state: string | undefined, formData : FormData) => {
            return await updateAirport(formData, airport.airport_id);
        },
        undefined
    )
    return (
        <form action={formAction}>
            <div className='rounded-md bg-gray-50 p-4 md:p-6'>
                <div className='mb-4'>
                    <label htmlFor='code' className='mb-2 block text-s, font-medium'>
                        Enter Airport Code
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <input
                            type='text'
                            id='code'
                            name='code'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            placeholder='JFK'
                            maxLength={3}
                            defaultValue={airport.code}
                        />
                    </div>
                </div>
                <div className='mb-4'>
                    <label htmlFor='name' className='mb-2 block text-s, font-medium'>
                        Enter Airport Name
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            placeholder='John F. Kennedy International Airport'
                            defaultValue={airport.name}
                        />
                    </div>
                </div>

                <div className='mb-4'>
                    <label htmlFor='city' className='mb-2 block text-s, font-medium'>
                        Enter City
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <input
                            type='text'
                            id='city'
                            name='city'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            placeholder='New York'
                            defaultValue={airport.city}
                            required
                        />
                    </div>
                </div>

                <div className='mb-4'>
                    <label htmlFor='country' className='mb-2 block text-s, font-medium'>
                        Enter Country
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <input
                            type='text'
                            id='country'
                            name='country'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            placeholder='United States'
                            defaultValue={airport.country}
                            required
                        />
                    </div>
                </div>

                <div className='flex justify-end gap-4 mt-6'>
                    <Link
                        href= "/dashboard/airports"
                        className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
                    >
                        Cancel
                    </Link>
                    <Button type='submit'>Update Airport</Button>
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
