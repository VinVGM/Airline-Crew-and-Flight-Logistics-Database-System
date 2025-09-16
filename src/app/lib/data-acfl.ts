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
    FlightView,
    FlightScheduleView
} from './definitions-acpl'
import { createClient } from '@/supabase/server';



const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' as const });

// Postgres row types where date/timestamp fields may be Date or string
type EmployeeRow = Omit<Employee, 'dob' | 'created_at'> & {
  dob: string | Date;
  created_at: string | Date;
};

type CrewRow = Omit<Crew, 'created_at'> & {
  created_at: string | Date;
};

type AircraftRow = Omit<Aircraft, 'created_at'> & {
  created_at: string | Date;
};

type AirportRow = Omit<Airport, 'created_at'> & {
  created_at: string | Date;
};

type FlightRow = Omit<Flight, 'created_at'> & {
  created_at: string | Date;
};

type FlightViewRow = Omit<FlightView, 'created_at'> & {
  created_at: string | Date;
};

type FlightScheduleRow = Omit<
  FlightSchedule,
  'arrival_time' | 'departure_time' | 'date' | 'created_at'
> & {
  arrival_time: string | Date;
  departure_time: string | Date;
  date: string | Date;
  created_at: string | Date;
};

type FlightScheduleViewRow = Omit<
  FlightScheduleView,
  'arrival_time' | 'departure_time' | 'date' | 'created_at'
> & {
  arrival_time: string | Date;
  departure_time: string | Date;
  date: string | Date;
  created_at: string | Date;
};


export async function fetchOnTimeFlights() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("User not authenticated");

    const data = await sql<FlightViewRow[]>`
      SELECT *
      FROM flight_view
      WHERE user_id = ${user.id}
        AND status = 'In Flight'
      ORDER BY created_at DESC
    `;

    return data.map((flight) => ({
      ...flight,
      created_at:
        flight.created_at instanceof Date
          ? flight.created_at.toISOString().split("T")[0]
          : String(flight.created_at),
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch on-time flights.");
  }
}


export async function fetchEmployees(query: string, currentPage: number){
    try{

        const supabase = await createClient();

        const { data: { user }} = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated');
        const data = await sql<EmployeeRow[]>`
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
        const data = await sql<EmployeeRow[]>`SELECT * FROM employee where employee_id=${id} AND user_id=${user.id};`
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

        const data = await sql<CrewRow[]>`
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






export async function fetchCrewbyId(id: string): Promise<Crew[]> {
  try {

    const supabase = await createClient();

    const { data: { user }} = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated');

    const data = await sql<CrewRow[]>`SELECT * FROM crew WHERE user_id=${user.id} and crew_id = ${id}`;
    
    return data.map((crew) => ({
      ...crew,
      created_at:
        crew.created_at instanceof Date
          ? crew.created_at.toISOString().split("T")[0]
          : crew.created_at,
    })) as Crew[];

    return data as unknown as Crew[];
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
        const data = await sql<AircraftRow[]>`
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
        const data = await sql<AircraftRow[]>`SELECT * FROM aircraft where aircraft_id=${id} AND user_id=${user.id};`
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
        const data = await sql<AirportRow[]>`
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
        const data = await sql<AirportRow[]>`SELECT * FROM airport where airport_id=${id} AND user_id=${user.id};`
        return data.map(airport => ({
            ...airport,
            created_at: airport.created_at instanceof Date ? airport.created_at.toISOString().split('T')[0] : airport.created_at,
        }));
    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch airport data.');
    }
}



export async function fetchFlights(query: string, currentPage: number) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("User not authenticated");

    await sql`
    CREATE OR REPLACE VIEW flight_view AS
SELECT 
    f.flight_id,
    f.user_id,
    f.flight_no,
    f.status,
    f.aircraft_id,
    f.origin_airport_id,
    f.destination_airport_id,
    f.created_at,

    -- Origin airport
    a1.code AS origin_code,
    a1.name AS origin_name,
    a1.city AS origin_city,
    a1.country AS origin_country,

    -- Destination airport
    a2.code AS destination_code,
    a2.name AS destination_name,
    a2.city AS destination_city,
    a2.country AS destination_country,

    -- Aircraft details
    ac.aircraft_reg AS aircraft_registration,
    ac.model AS aircraft_model,
    ac.manufacturer AS aircraft_manufacturer,
    ac.capacity AS aircraft_capacity,
    ac.maintenance_status AS aircraft_status

FROM flight f
JOIN airport a1 ON f.origin_airport_id = a1.airport_id
JOIN airport a2 ON f.destination_airport_id = a2.airport_id
JOIN aircraft ac ON f.aircraft_id = ac.aircraft_id;

    
    `;


    const data = await sql<FlightViewRow[]>`
      SELECT *
      FROM flight_view
      WHERE user_id = ${user.id}
        AND (
          flight_no ILIKE ${"%" + query + "%"} OR
          status ILIKE ${"%" + query + "%"} OR
          origin_code ILIKE ${"%" + query + "%"} OR
          origin_name ILIKE ${"%" + query + "%"} OR
          destination_code ILIKE ${"%" + query + "%"} OR
          destination_name ILIKE ${"%" + query + "%"} OR
          created_at::text ILIKE ${"%" + query + "%"}
        )
      ORDER BY created_at DESC
      LIMIT 6 OFFSET ${(currentPage - 1) * 6};
    `;

    // Normalize created_at to "YYYY-MM-DD"
    return data.map((flight) => ({
      ...flight,
      created_at:
        (flight.created_at as any) instanceof Date
          ? (flight.created_at as unknown as Date).toISOString().split("T")[0]
          : String(flight.created_at),
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch flight data.");
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
        const data = await sql<FlightRow[]>`SELECT * FROM flight where flight_id=${id} AND user_id=${user.id};`
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

        await sql`
      CREATE OR REPLACE VIEW flight_schedule_view AS
      SELECT 
          fs.schedule_id,
          fs.user_id,
          fs.crew_id,
          fs.flight_id,
          f.flight_no,
          c.crew_name,
          fs.arrival_time,
          fs.departure_time,
          fs.date,
          fs.created_at
      FROM flight_schedule fs
      JOIN flight f ON fs.flight_id = f.flight_id
      JOIN crew c ON fs.crew_id = c.crew_id;
    `;





        
        const data = await sql<FlightScheduleViewRow[]>`
      SELECT *
      FROM flight_schedule_view
      WHERE user_id = ${user.id}
        AND (
          flight_no ILIKE ${"%" + query + "%"} OR
          crew_name ILIKE ${"%" + query + "%"} OR
          arrival_time::text ILIKE ${"%" + query + "%"} OR
          departure_time::text ILIKE ${"%" + query + "%"} OR
          date::text ILIKE ${"%" + query + "%"}
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
        const data = await sql<FlightScheduleRow[]>`SELECT *, f.flight_no FROM flight_schedule fs JOIN flight f ON fs.flight_id = f.flight_id where schedule_id=${id} AND user_id=${user.id};`
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


