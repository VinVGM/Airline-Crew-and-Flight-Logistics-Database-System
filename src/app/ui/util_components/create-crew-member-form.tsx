"use client";

import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { createCrewMember } from '@/app/lib/actions';
import { useActionState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function CrewMemberForm() {
    const [errorMessage, formAction] = useActionState(
        async (_state: string | undefined, formData: FormData) => {
            return await createCrewMember(formData);
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
                    <label htmlFor='employee_id' className='mb-2 block text-s font-medium'>Employee ID</label>
                    <input
                        type='text'
                        id='employee_id'
                        name='employee_id'
                        placeholder='Enter Employee ID'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='role' className='mb-2 block text-s font-medium'>Role</label>
                    <input
                        type='text'
                        id='role'
                        name='role'
                        placeholder='Enter Role'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        required
                    />
                </div>

                <div className='flex justify-end gap-4 mt-6'>
                    <Link href="/dashboard/crew-members" className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200'>Cancel</Link>
                    <Button type='submit'>Add Crew Member</Button>
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
