import { CrewMember } from '@/app/lib/definitions-acpl';
import { fetchCrewMembers } from '@/app/lib/data-acfl';

export default async function CrewMembersTable() {
  // const crewMembers: CrewMember[] = await fetchCrewMembers();

  const crewMembers: CrewMember[] = [
    {
      crew_id: '1',
      employee_id: '101',
      role: 'Pilot',
    },
    {
      crew_id: '1',
      employee_id: '102',
      role: 'Co-Pilot',
    },
    {
      crew_id: '2',
      employee_id: '103',
      role: 'Flight Attendant',
    },
  ];
  

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {crewMembers?.map((member, idx) => (
              <div
                key={member.crew_id + member.employee_id + idx}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Crew ID: {member.crew_id}</p>
                    <p className="text-sm text-gray-500">Employee ID: {member.employee_id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Crew ID</th>
                <th className="px-3 py-5 font-medium">Employee ID</th>
                <th className="px-3 py-5 font-medium">Role</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {crewMembers?.map((member, idx) => (
                <tr
                  key={member.crew_id + member.employee_id + idx}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">{member.crew_id}</td>
                  <td className="whitespace-nowrap px-3 py-3">{member.employee_id}</td>
                  <td className="whitespace-nowrap px-3 py-3">{member.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}