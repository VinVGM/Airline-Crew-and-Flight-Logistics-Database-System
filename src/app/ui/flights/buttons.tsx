import { deleteFlight } from '@/app/lib/actions';
import { PencilIcon, PlusIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateFlight() {
  return (
    <Link
      href="/dashboard/flights/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Flight</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateFlight({ id }: { id: string }) {
  return (
    <Link
      href={ `/dashboard/flights/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilSquareIcon className="h-5 w-5 text-blue-600 hover:text-blue-800" />
    </Link>
  );
}

export function DeleteFlight({ id }: { id: string }) {

  const deleteFlightWithId = deleteFlight.bind(null, id)
  return (
    <>
    <form action={deleteFlightWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5 text-red-600 hover:text-red-800" />
      </button>
    </form>
    </>
  );
}
