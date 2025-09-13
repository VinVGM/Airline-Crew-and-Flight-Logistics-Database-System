import postgres from 'postgres';

import {
    Employee,
    Crew,
    CrewMember,
    Aircraft,
    Airport,
    Flight,
    FlightSchedule,
    CrewOverall,
} from './definitions-acpl'
import { create } from 'domain';
import { createClient } from '@/supabase/server';



const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});

export async function fetchEmployees(){
    try{

        const supabase = await createClient();

        const { data: { user }} = await supabase.auth.getUser()
        const data = await sql<Employee[]>`SELECT * FROM employee where user_id = ${user.id}`;
        
        return data.map(emp => ({
            ...emp,
            dob: emp.dob instanceof Date ? emp.dob.toISOString().split('T')[0] : emp.dob,
            created_at: emp.created_at instanceof Date ? emp.created_at.toISOString().split('T')[0] : emp.created_at,
        }));

    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch employee data.');
    }
}


export async function fetchEmployeeById(id :string){
    const supabase = await createClient();

    const { data: { user }} = await supabase.auth.getUser()
    try{
        const data = await sql<Employee[]>`SELECT * FROM employee where employee_id=${id} AND user_id=${user.id};`
        return data.map(emp => ({
            ...emp,
            dob: emp.dob instanceof Date ? emp.dob.toISOString().split('T')[0] : emp.dob,
            created_at: emp.created_at instanceof Date ? emp.created_at.toISOString().split('T')[0] : emp.created_at,
        }));
    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch employee data.');
    }
}


export async function fetchCrews(){
    try{

        const supabase = await createClient();

        const {
          data: { user },
        } = await supabase.auth.getUser();

        const data = await sql<Crew[]>`SELECT * FROM crew where user_id = ${user.id}`;

        return data.map((crew) => ({
          ...crew,
          created_at:
            crew.created_at instanceof Date
              ? crew.created_at.toISOString().split("T")[0]
              : crew.created_at,
        }));

    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch crew data.');
    }
}






export async function fetchCrewbyId(id: string) {
  try {

    const supabase = await createClient();

    const { data: { user }} = await supabase.auth.getUser()

    const data = await sql<Crew[]>`SELECT * FROM crew WHERE user_id=${user.id} and crew_id = ${id}`;
    
    return data.map((crew) => ({
      ...crew,
      created_at:
        crew.created_at instanceof Date
          ? crew.created_at.toISOString().split("T")[0]
          : crew.created_at,
    }));

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch crew data.");
  }
}


export async function fetchCrewMembers(){
    try{

        const supabase = await createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        await sql`
        CREATE OR REPLACE VIEW CrewOverall AS
        SELECT
        cm.crew_ID       AS crew_id,
        cm.employee_ID   AS employee_id,
        cm.role          AS role,
        c.user_ID        AS user_id,   -- crew and employee both tied to user_id
        c.crew_Name      AS crew_name,
         e.name           AS name
        FROM CREW_MEMBER cm
        JOIN CREW c ON cm.Crew_ID = c.Crew_ID
        JOIN EMPLOYEE e ON cm.Employee_ID = e.Employee_ID
        ;
        `;


        const data = await sql<CrewOverall[]>`SELECT * FROM CrewOverall where user_id = ${user.id}`;
        return data;
    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch crew member data.');
    }
}



export async function fetchCrewMemberById(id1: string, id2: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await sql`
        CREATE OR REPLACE VIEW CrewOverall AS
        SELECT
        cm.crew_ID       AS crew_id,
        cm.employee_ID   AS employee_id,
        cm.role          AS role,
        c.user_ID        AS user_id,   -- crew and employee both tied to user_id
        c.crew_Name      AS crew_name,
         e.name           AS name
        FROM CREW_MEMBER cm
        JOIN CREW c ON cm.Crew_ID = c.Crew_ID
        JOIN EMPLOYEE e ON cm.Employee_ID = e.Employee_ID
        ;
        `;

    const data = await sql<
      CrewOverall[]
    >`SELECT * FROM CrewOverall where user_id = ${user.id} and crew_id = ${id1} and employee_id = ${id2}`;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch crew member data.");
  }
}





export async function fetchAircrafts(){
    try{
        const data = await sql<Aircraft[]>`SELECT * FROM aircraft`;
        return data;
    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch aircraft data.');
    }
}


export async function fetchAirports(){
    try{
        const data = await sql<Airport[]>`SELECT * FROM airport`;
        return data;
    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch airport data.');
    }
}

export async function fetchFlights(){
    try{
        const data = await sql<Flight[]>`SELECT * FROM flight`;
        return data;
    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch flight data.');
    }
}
export async function fetchFlightSchedules(){
    try{
        const data = await sql<FlightSchedule[]>`SELECT * FROM flight_schedule`;
        return data;
    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch flight schedule data.');
    }
}