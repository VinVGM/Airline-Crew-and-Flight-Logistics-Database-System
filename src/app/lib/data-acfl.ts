import postgres from 'postgres';

import {
    Employee,
    Crew,
    CrewMember,
    Aircraft,
    Airport,
    Flight,
    FlightSchedule,
} from './definitions-acpl'



const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});

export async function fetchEmployees(){
    try{
        const data = await sql<Employee[]>`SELECT * FROM employee`;
        
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
        const data = await sql<Crew[]>`SELECT * FROM crew`;
        return data;
    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch crew data.');
    }
}



export async function fetchCrewMembers(){
    try{
        const data = await sql<CrewMember[]>`SELECT * FROM crew_member`;
        return data;
    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch crew member data.');
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