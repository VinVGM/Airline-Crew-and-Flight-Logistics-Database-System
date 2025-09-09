import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { createEmployee } from '@/app/lib/actions';

export default function Form() {
    return (
        <form action={createEmployee}>
            <div className='rounded-md bg-gray-50 p-4 md:p-6'>
                <div className='mb-4'>
                    <label htmlFor='name' className='mb-2 block text-s, font-medium'>
                        Enter Name
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <input
                            type='text'
                            id='name'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            placeholder='Employee Name'
                        />
                    </div>
                </div>
                <div className='mb-4'>
                    <label htmlFor='name' className='mb-2 block text-s, font-medium'>
                        Enter Designation
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <input
                            type='text'
                            id='name'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            placeholder='First Officer'
                        />
                    </div>
                </div>

                <div className='mb-4'>
                    <label htmlFor='name' className='mb-2 block text-s, font-medium'>
                        Enter Date of Birth
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <input
                            type='date'
                            id='date-of-birth'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
    
                        />
                    </div>
                </div>





                <div className='mb-4'>
                    <label htmlFor='name' className='mb-2 block text-s, font-medium'>
                        Enter License Number
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <input
                            type='number'
                            id='license-number'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            placeholder='BA4597'
                        />
                    </div>
                </div>



                <div className='mb-4'>
                    <label htmlFor='name' className='mb-2 block text-s, font-medium'>
                        Enter Experience
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <input
                            type='number'
                            id='experience'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            placeholder='1-25'
                        />
                    </div>
                </div>

                <div className='flex justify-end gap-4 mt-6'>
                    <Link
                        href= "/dashboard/employees"
                        className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
                    >
                        Cancel
                    </Link>
                    <Button type='submit'>Create Employee</Button>
                </div>
            </div>
        </form>
    );
}