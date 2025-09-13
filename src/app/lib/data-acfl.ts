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

export async function fetchEmployees(query: string, currentPage: number){
    try{

        const supabase = await createClient();

        const { data: { user }} = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated');
        const data = await sql<Employee[]>`
        SELECT * 
        FROM employee
        WHERE user_id = ${user.id}
        AND (
            name ILIKE ${"%" + query + "%"} OR
            designation ILIKE ${"%" + query + "%"} OR
            license_number ILIKE ${"%" + query + "%"} OR
            experience::text ILIKE ${"%" + query + "%"} OR
            dob::text ILIKE ${"%" + query + "%"}
        )
        ORDER BY created_at DESC
        LIMIT 6 OFFSET ${(currentPage - 1) * 6};
        `;
        
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


export async function fetchEmployeesPages(query: string) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    const data = await sql`
        SELECT COUNT(*) 
        FROM employee
        WHERE user_id = ${user.id}
        AND (
            name ILIKE ${"%" + query + "%"} OR
            designation ILIKE ${"%" + query + "%"} OR
            license_number ILIKE ${"%" + query + "%"} OR
            experience::text ILIKE ${"%" + query + "%"} OR
            dob::text ILIKE ${"%" + query + "%"}
        )
        `;
    const totalPages = Math.ceil(Number(data[0].count) / 6);
    return totalPages
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch employee data.");
  }
}

export async function fetchEmployeeById(id :string){
    const supabase = await createClient();

    const { data: { user }} = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated');
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


export async function fetchCrews(query: string, currentPage: number){
    try{

        const supabase = await createClient();

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const data = await sql<Crew[]>`
        SELECT * 
        FROM crew
        WHERE user_id = ${user.id}
        AND (
            crew_name ILIKE ${"%" + query + "%"} OR
            created_at::text ILIKE ${"%" + query + "%"}
        )
        ORDER BY created_at DESC
        LIMIT 6 OFFSET ${(currentPage - 1) * 6};
        `;

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

export async function fetchCrewsPages(query: string) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    const data = await sql`
        SELECT COUNT(*) 
        FROM crew
        WHERE user_id = ${user.id}
        AND (
            crew_name ILIKE ${"%" + query + "%"} OR
            created_at::text ILIKE ${"%" + query + "%"}
        )
        `;
    const totalPages = Math.ceil(Number(data[0].count) / 6);
    return totalPages
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch crew data.");
  }
}






export async function fetchCrewbyId(id: string) {
  try {

    const supabase = await createClient();

    const { data: { user }} = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated');

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


export async function fetchCrewMembers(query: string, currentPage: number){
    try{

        const supabase = await createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

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


        const data = await sql<CrewOverall[]>`
        SELECT * 
        FROM CrewOverall 
        WHERE user_id = ${user.id}
        AND (
            crew_name ILIKE ${"%" + query + "%"} OR
            name ILIKE ${"%" + query + "%"} OR
            role ILIKE ${"%" + query + "%"}
        )
        ORDER BY crew_name, name
        LIMIT 6 OFFSET ${(currentPage - 1) * 6};
        `;
        return data;
    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch crew member data.');
    }
}

export async function fetchCrewMembersPages(query: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

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

    const data = await sql`
        SELECT COUNT(*) 
        FROM CrewOverall 
        WHERE user_id = ${user.id}
        AND (
            crew_name ILIKE ${"%" + query + "%"} OR
            name ILIKE ${"%" + query + "%"} OR
            role ILIKE ${"%" + query + "%"}
        )
        `;
    const totalPages = Math.ceil(Number(data[0].count) / 6);
    return totalPages
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch crew member data.");
  }
}



export async function fetchCrewMemberById(id1: string, id2: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

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





export async function fetchAircrafts(query: string, currentPage: number){
    try{
        const supabase = await createClient();

        const { data: { user }} = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated');
        const data = await sql<Aircraft[]>`
        SELECT * 
        FROM aircraft 
        WHERE user_id = ${user.id}
        AND (
            model ILIKE ${"%" + query + "%"} OR
            manufacturer ILIKE ${"%" + query + "%"} OR
            aircraft_reg ILIKE ${"%" + query + "%"} OR
            maintenance_status ILIKE ${"%" + query + "%"} OR
            capacity::text ILIKE ${"%" + query + "%"} OR
            created_at::text ILIKE ${"%" + query + "%"}
        )
        ORDER BY created_at DESC
        LIMIT 6 OFFSET ${(currentPage - 1) * 6};
        `;
        
        return data.map(aircraft => ({
            ...aircraft,
            created_at: aircraft.created_at instanceof Date ? aircraft.created_at.toISOString().split('T')[0] : aircraft.created_at,
        }));

    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch aircraft data.');
    }
}

export async function fetchAircraftsPages(query: string) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    const data = await sql`
        SELECT COUNT(*) 
        FROM aircraft
        WHERE user_id = ${user.id}
        AND (
            model ILIKE ${"%" + query + "%"} OR
            manufacturer ILIKE ${"%" + query + "%"} OR
            aircraft_reg ILIKE ${"%" + query + "%"} OR
            maintenance_status ILIKE ${"%" + query + "%"} OR
            capacity::text ILIKE ${"%" + query + "%"} OR
            created_at::text ILIKE ${"%" + query + "%"}
        )
        `;
    const totalPages = Math.ceil(Number(data[0].count) / 6);
    return totalPages
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch aircraft data.");
  }
}

export async function fetchAircraftById(id: string){
    const supabase = await createClient();

    const { data: { user }} = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated');
    try{
        const data = await sql<Aircraft[]>`SELECT * FROM aircraft where aircraft_id=${id} AND user_id=${user.id};`
        return data.map(aircraft => ({
            ...aircraft,
            created_at: aircraft.created_at instanceof Date ? aircraft.created_at.toISOString().split('T')[0] : aircraft.created_at,
        }));
    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch aircraft data.');
    }
}


export async function fetchAirports(query: string, currentPage: number){
    try{
        const supabase = await createClient();

        const { data: { user }} = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated');
        const data = await sql<Airport[]>`
        SELECT * 
        FROM airport 
        WHERE user_id = ${user.id}
        AND (
            code ILIKE ${"%" + query + "%"} OR
            name ILIKE ${"%" + query + "%"} OR
            city ILIKE ${"%" + query + "%"} OR
            country ILIKE ${"%" + query + "%"} OR
            created_at::text ILIKE ${"%" + query + "%"}
        )
        ORDER BY created_at DESC
        LIMIT 6 OFFSET ${(currentPage - 1) * 6};
        `;
        
        return data.map(airport => ({
            ...airport,
            created_at: airport.created_at instanceof Date ? airport.created_at.toISOString().split('T')[0] : airport.created_at,
        }));

    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch airport data.');
    }
}

export async function fetchAirportsPages(query: string) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    const data = await sql`
        SELECT COUNT(*) 
        FROM airport
        WHERE user_id = ${user.id}
        AND (
            code ILIKE ${"%" + query + "%"} OR
            name ILIKE ${"%" + query + "%"} OR
            city ILIKE ${"%" + query + "%"} OR
            country ILIKE ${"%" + query + "%"} OR
            created_at::text ILIKE ${"%" + query + "%"}
        )
        `;
    const totalPages = Math.ceil(Number(data[0].count) / 6);
    return totalPages
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch airport data.");
  }
}

export async function fetchAirportById(id: string){
    const supabase = await createClient();

    const { data: { user }} = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated');
    try{
        const data = await sql<Airport[]>`SELECT * FROM airport where airport_id=${id} AND user_id=${user.id};`
        return data.map(airport => ({
            ...airport,
            created_at: airport.created_at instanceof Date ? airport.created_at.toISOString().split('T')[0] : airport.created_at,
        }));
    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch airport data.');
    }
}

export async function fetchFlights(query: string, currentPage: number){
    try{
        const supabase = await createClient();

        const { data: { user }} = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated');
        const data = await sql<Flight[]>`
        SELECT * 
        FROM flight 
        WHERE user_id = ${user.id}
        AND (
            flight_no ILIKE ${"%" + query + "%"} OR
            status ILIKE ${"%" + query + "%"} OR


            created_at::text ILIKE ${"%" + query + "%"}
        )
        ORDER BY created_at DESC
        LIMIT 6 OFFSET ${(currentPage - 1) * 6};
        `;
        
        return data.map(flight => ({
            ...flight,
            created_at: (flight.created_at as any) instanceof Date ? (flight.created_at as unknown as Date).toISOString().split('T')[0] : String(flight.created_at),
        }));

    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch flight data.');
    }
}

export async function fetchFlightsPages(query: string) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    const data = await sql`
        SELECT COUNT(*) 
        FROM flight
        WHERE user_id = ${user.id}
        AND (
            flight_no ILIKE ${"%" + query + "%"} OR
            status ILIKE ${"%" + query + "%"} OR

            created_at::text ILIKE ${"%" + query + "%"}
        )
        `;
    const totalPages = Math.ceil(Number(data[0].count) / 6);
    return totalPages
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch flight data.");
  }
}

export async function fetchFlightById(id: string){
    const supabase = await createClient();

    const { data: { user }} = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated');
    try{
        const data = await sql<Flight[]>`SELECT * FROM flight where flight_id=${id} AND user_id=${user.id};`
        return data.map(flight => ({
            ...flight,
            created_at: (flight.created_at as any) instanceof Date ? (flight.created_at as Date).toISOString().split('T')[0] : String(flight.created_at),
        }));
    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch flight data.');
    }
}
export async function fetchFlightSchedules(query: string, currentPage: number){
    try{
        const supabase = await createClient();

        const { data: { user }} = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated');
        const data = await sql<FlightSchedule[]>`
        SELECT *, f.flight_no
        FROM flight_schedule fs
        join flight f on fs.flight_id = f.flight_id
        WHERE fs.user_id = ${user.id}
        AND (

            fs.arrival_time::text ILIKE ${"%" + query + "%"} OR
            fs.departure_time::text ILIKE ${"%" + query + "%"} OR
            fs.date::text ILIKE ${"%" + query + "%"} OR
            fs.created_at::text ILIKE ${"%" + query + "%"}
        )
        ORDER BY date DESC, departure_time DESC
        LIMIT 6 OFFSET ${(currentPage - 1) * 6};
        `;
        
        return data.map(schedule => ({
            ...schedule,
            arrival_time: schedule.arrival_time instanceof Date ? schedule.arrival_time.toISOString().split('T')[0] + ' ' + schedule.arrival_time.toTimeString().split(' ')[0] : schedule.arrival_time,
            departure_time: schedule.departure_time instanceof Date ? schedule.departure_time.toISOString().split('T')[0] + ' ' + schedule.departure_time.toTimeString().split(' ')[0] : schedule.departure_time,
            date: schedule.date instanceof Date ? schedule.date.toISOString().split('T')[0] : schedule.date,
            created_at: schedule.created_at instanceof Date ? schedule.created_at.toISOString().split('T')[0] : schedule.created_at,
        }));

    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch flight schedule data.');
    }
}

export async function fetchFlightSchedulesPages(query: string) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    const data = await sql`
        SELECT COUNT(*) 
        FROM flight_schedule
        WHERE user_id = ${user.id}
        AND (

            arrival_time::text ILIKE ${"%" + query + "%"} OR
            departure_time::text ILIKE ${"%" + query + "%"} OR
            date::text ILIKE ${"%" + query + "%"} OR
            created_at::text ILIKE ${"%" + query + "%"}
        )
        `;
    const totalPages = Math.ceil(Number(data[0].count) / 6);
    return totalPages
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch flight schedule data.");
  }
}

export async function fetchFlightScheduleById(id: string){
    const supabase = await createClient();

    const { data: { user }} = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated');
    try{
        const data = await sql<FlightSchedule[]>`SELECT *, f.flight_no FROM flight_schedule fs JOIN flight f ON fs.flight_id = f.flight_id where schedule_id=${id} AND user_id=${user.id};`
        return data.map(schedule => ({
            ...schedule,
            arrival_time: schedule.arrival_time instanceof Date ? schedule.arrival_time.toISOString().split('T')[0] + ' ' + schedule.arrival_time.toTimeString().split(' ')[0] : schedule.arrival_time,
            departure_time: schedule.departure_time instanceof Date ? schedule.departure_time.toISOString().split('T')[0] + ' ' + schedule.departure_time.toTimeString().split(' ')[0] : schedule.departure_time,
            date: schedule.date instanceof Date ? schedule.date.toISOString().split('T')[0] : schedule.date,
            created_at: schedule.created_at instanceof Date ? schedule.created_at.toISOString().split('T')[0] : schedule.created_at,
        }));
    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch flight schedule data.');
    }
}


