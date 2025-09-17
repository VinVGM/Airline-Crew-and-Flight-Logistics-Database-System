"use client";

import { SubmitButton } from '@/app/ui/submit-button';
import Link from 'next/link';
import { createAircraft } from '@/app/lib/actions';
import { useActionState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';


export default function Form() {
    const [errorMessage, formAction] = useActionState(
        async (_state: string | undefined, formData : FormData) => {
            return await createAircraft(formData);
        },
        undefined
    )
    return (
        <form action={formAction}>
            <div className='rounded-md bg-gray-50 p-4 md:p-6'>
                <div className='mb-4'>
                    <label htmlFor='model' className='mb-2 block text-s, font-medium'>
                        Enter Model
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <input
                            type='text'
                            id='model'
                            name='model'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            placeholder='Boeing 737'
                        />
                    </div>
                </div>
                <div className='mb-4'>
                    <label htmlFor='manufacturer' className='mb-2 block text-s, font-medium'>
                        Enter Manufacturer
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <input
                            type='text'
                            id='manufacturer'
                            name='manufacturer'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            placeholder='Boeing'
                        />
                    </div>
                </div>

                <div className='mb-4'>
                    <label htmlFor='reg' className='mb-2 block text-s, font-medium'>
                        Enter Aircraft Registration
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <input
                            type='text'
                            id='reg'
                            name='reg'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            placeholder='Boeing'
                            
                        />
                    </div>
                </div>

                <div className='mb-4'>
                    <label htmlFor='capacity' className='mb-2 block text-s, font-medium'>
                        Enter Capacity
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <input
                            type='number'
                            id='capacity'
                            name='capacity'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            placeholder='150'
                            required
                        />
                    </div>
                </div>

                <div className='mb-4'>
                    <label htmlFor='maintenance_status' className='mb-2 block text-s, font-medium'>
                        Enter Maintenance Status
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <select
                            id='maintenance_status'
                            name='maintenance_status'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="Operational">Operational</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Out of Service">Out of Service</option>
                        </select>
                    </div>
                </div>

                <div className='flex justify-end gap-4 mt-6'>
                    <Link
                        href= "/dashboard/aircrafts"
                        className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
                    >
                        Cancel
                    </Link>
                    <SubmitButton pendingText="Creating...">Create Aircraft</SubmitButton>
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