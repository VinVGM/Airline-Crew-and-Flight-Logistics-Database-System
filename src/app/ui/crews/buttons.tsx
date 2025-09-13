import { deleteCrew, deleteEmployee } from "@/app/lib/actions";
import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateCrew() {
  return (
    <Link
      href="/dashboard/crews/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Crew</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function CreateCrewMembers() {
  return (
    <Link
      href="/dashboard/crew-members/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Crew Members</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCrew({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/crews/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilSquareIcon className="h-5 w-5 text-blue-600 hover:text-blue-800" />
    </Link>
  );
}

export function DeleteCrew({ id }: { id: string }) {
  const deleteCrewWithId = deleteCrew.bind(null, id);
  return (
    <>
      <form action={deleteCrewWithId}>
        <button
          type="submit"
          className="rounded-md border p-2 hover:bg-gray-100"
        >
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5 text-red-600 hover:text-red-800" />
        </button>
      </form>
    </>
  );
}
