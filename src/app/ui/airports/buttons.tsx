import { deleteAirport } from '@/app/lib/actions';
import { PencilIcon, PlusIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateAirport() {
  return (
    <Link
      href="/dashboard/airports/create"
      className="flex h-10 items-center rounded-lg bg-[#D25D5D] px-4 text-sm font-medium text-white transition-colors hover:bg-[#B9375D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D25D5D]"
    >
      <span className="hidden md:block">Create Airport</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateAirport({ id }: { id: string }) {
  return (
    <Link
      href={ `/dashboard/airports/${id}/edit`}
      className="rounded-md border p-2 hover:bg-[#E7D3D3]"
    >
      <PencilSquareIcon className="h-5 w-5 text-[#D25D5D] hover:text-[#B9375D]" />
    </Link>
  );
}

export function DeleteAirport({ id }: { id: string }) {

  const deleteAirportWithId = deleteAirport.bind(null, id)
  return (
    <>
    <form action={deleteAirportWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-[#E7D3D3]">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5 text-red-600 hover:text-red-800" />
      </button>
    </form>
    </>
  );
}
