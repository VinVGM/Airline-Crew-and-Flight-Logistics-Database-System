import { CrewMember } from '@/app/lib/definitions-acpl';
import { fetchCrewMembers } from '@/app/lib/data-acfl';

import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

export default async function CrewMembersTable() {
  // const crewMembers: CrewMember[] = await fetchCrewMembers();

  const crewMembers: CrewMember[] = [
    { crew_id: '1', employee_id: '101', role: 'Pilot' },
    { crew_id: '1', employee_id: '102', role: 'Co-Pilot' },
    { crew_id: '1', employee_id: '103', role: 'Flight Attendant' },
    { crew_id: '2', employee_id: '201', role: 'Pilot' },
    { crew_id: '2', employee_id: '202', role: 'Flight Attendant' },
  ];

  // Group crew members by crew_id
  const grouped = crewMembers.reduce<Record<string, CrewMember[]>>((acc, member) => {
    if (!acc[member.crew_id]) acc[member.crew_id] = [];
    acc[member.crew_id].push(member);
    return acc;
  }, {});

  return (
    <div className="mt-6 grid gap-6">
      {Object.entries(grouped).map(([crewId, members]) => (
        <div key={crewId} className="rounded-lg bg-white p-4 shadow">
          <div className="mb-2 font-semibold text-gray-700">Crew ID: {crewId}</div>
          <table className="min-w-full text-gray-900">
            <thead>
              <tr className="text-left text-sm font-normal">
                <th className="px-2 py-2">Employee ID</th>
                <th className="px-2 py-2">Role</th>
                <th className="px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.employee_id} className="border-b last:border-none">
                  <td className="px-2 py-2">{member.employee_id}</td>
                  <td className="px-2 py-2">{member.role}</td>
                  <td className="px-2 py-2">
                    <div className="flex gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        title="Update"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
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
