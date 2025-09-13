import { CrewMember, CrewOverall } from '@/app/lib/definitions-acpl';
import { fetchCrewMembers } from '@/app/lib/data-acfl';

import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { DeleteCrewMember, UpdateCrewMember } from './buttons';

export default async function CrewMembersTable({
    query,
    currentPage,
  }:{
    query: string;
    currentPage: number
  }) {
  const crewMembers = await fetchCrewMembers(query, currentPage);



  // Group crew members by crew_id
  const grouped = crewMembers.reduce<Record<string, CrewOverall[]>>((acc, member) => {
    if (!acc[member.crew_id]) acc[member.crew_id] = [];
    acc[member.crew_id].push(member);
    return acc;
  }, {});

  return (
    <div className="mt-6 grid gap-6">
      {Object.entries(grouped).map(([crewId, members]) => (
        <div key={crewId} className="rounded-lg bg-white p-4 shadow">
          <div className="mb-4 space-y-1">
            <div>
              <span className="text-s font-medium text-gray-600">
                Crew ID:
              </span>
              <span className="ml-2 text-gray-800 font-mono">{crewId}</span>
            </div>
            <div>
              <span className="text-s font-medium text-gray-600">
                Crew Name:
              </span>
              <span className="ml-2 font-semibold text-gray-600">
                {members[0].crew_name}
              </span>
            </div>
          </div>
          <table className="min-w-full text-gray-900">
            <thead>
              <tr className="text-left text-sm font-normal">
                <th className="px-2 py-2">Employee ID</th>
                <th className="px-2 py-2">Employee Name</th>
                <th className="px-2 py-2">Role</th>
                <th className="px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr
                  key={member.employee_id}
                  className="border-b last:border-none"
                >
                  <td className="px-2 py-2">{member.employee_id}</td>
                  <td className="px-2 py-2">{member.name}</td>
                  <td className="px-2 py-2">{member.role}</td>

                  <td className="px-2 py-2">
                    <div className="flex gap-2">
                      <UpdateCrewMember id1={crewId} id2={member.employee_id} />
                      <DeleteCrewMember id1={crewId} id2={member.employee_id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
