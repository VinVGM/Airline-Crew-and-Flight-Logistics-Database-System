import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteCrewMember } from "@/app/lib/actions";
export function UpdateCrewMember({ id1, id2 }: { id1: string, id2: string }) {
  return (
    <Link
      href={`/dashboard/crew-members/${id1}/${id2}/edit`}
      className="rounded-md border p-2 hover:bg-[#E7D3D3]"
    >
      <PencilSquareIcon className="h-5 w-5 text-[#D25D5D] hover:text-[#B9375D]" />
    </Link>
  );
}

export function DeleteCrewMember({ id1, id2 }: { id1: string, id2: string }) {
  const deleteCrewMemberWithId = deleteCrewMember.bind(null, id1, id2);
  return (
    <>
      <form action={deleteCrewMemberWithId}>
        <button
          type="submit"
          className="rounded-md border p-2 hover:bg-[#E7D3D3]"
        >
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5 text-red-600 hover:text-red-800" />
        </button>
      </form>
    </>
  );
}
