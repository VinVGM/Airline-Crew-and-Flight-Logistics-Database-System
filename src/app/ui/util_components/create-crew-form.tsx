"use client";

import { SubmitButton } from '@/app/ui/submit-button';
import Link from 'next/link';
import { createCrew } from '@/app/lib/actions';
import { useActionState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function CrewForm() {
    const [errorMessage, formAction] = useActionState(
        async (_state: string | undefined, formData: FormData) => {
            return await createCrew(formData);
        },
        undefined
    );

    return (
        <form action={formAction}>
            <div className='rounded-md bg-gray-50 p-4 md:p-6'>
                <div className='mb-4'>
                    <label htmlFor='name' className='mb-2 block text-s font-medium'>
                        Crew Name
                    </label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        placeholder='Enter Crew Name'
                        required
                    />
                </div>

                <div className='flex justify-end gap-4 mt-6'>
                    <Link
                        href="/dashboard/crews"
                        className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200'
                    >
                        Cancel
                    </Link>
                    <SubmitButton pendingText="Creating...">Create Crew</SubmitButton>
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
