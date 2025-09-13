'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { createClient } from '@/supabase/server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});




// Employee 

const employeeSchema = z.object({
  name: z.string(),
  designation: z.string(),
  dob: z.string(),          
  license_number: z.string(),
  experience: z.coerce.number(),
})


export async function createEmployee(formData : FormData){
    const {name, designation, dob, license_number, experience} = employeeSchema.parse({
        name: formData.get('name'),
        designation: formData.get('designation'),
        dob: formData.get('dob'),
        license_number: formData.get('license_number'),
        experience: formData.get('experience'),
    })


    const new_dob = new Date(dob).toISOString().split('T')[0];

    const supabase = await createClient();

    const { data: {user}} = await supabase.auth.getUser()
    try{
      await sql`
          INSERT INTO employee (user_id, name, designation, dob, license_number, experience) 
          VALUES (${user.id}, ${name}, ${designation}, ${new_dob}, ${license_number}, ${experience})
      `
    }catch(error){
      return `Something went wrong, Try Again. Error: ${error}`
    }
    
    revalidatePath('/dashboard/employees')
    redirect('/dashboard/employees')

    
}


export async function updateEmployee(formData:FormData, id: string) {
  const {name, designation, dob, license_number, experience} = employeeSchema.parse({
        name: formData.get('name'),
        designation: formData.get('designation'),
        dob: formData.get('dob'),
        license_number: formData.get('license_number'),
        experience: formData.get('experience'),
    })

    const new_dob = new Date(dob).toISOString().split('T')[0];

    const supabase = await createClient();

    const { data: {user}} = await supabase.auth.getUser();

    try{
      await sql`
        Update employee
        SET
          name = ${name},
          designation = ${designation},
          dob = ${new_dob},
          license_number = ${license_number},
          experience = ${experience}
        WHERE
        user_id = ${user.id} AND employee_id = ${id}


      `
      
    }catch(error){
      return `Something went Wrong! Error: ${error} `
    }


    revalidatePath('/dashboard/employees')
    redirect('/dashboard/employees')
  
}


export async function deleteEmployee(id : string){
  const supabase = await createClient();

  const { data: {user}} = await supabase.auth.getUser();
  
  
  await sql `
    DELETE FROM employee
    where user_id = ${user.id} and employee_id = ${id};
  `

  revalidatePath('/dashboard/employees');
}



// Crew

const crewSchema = z.object({
  name : z.string()
})


export async function createCrew(formData: FormData) {
  const { name } = crewSchema.parse({
    name: formData.get('name'),
  });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  try {
    await sql`
      INSERT INTO crew (user_id, crew_name)
      VALUES (${user.id}, ${name})
    `;
  } catch (error) {
    return `Something went wrong. Try again. Error: ${error}`;
  }

  revalidatePath('/dashboard/crews');
  redirect('/dashboard/crews');
}


export async function updateCrew(formData : FormData, id:string){
  const { name } =
    crewSchema.parse({
      name: formData.get("name"),
    });


  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    await sql`
        Update crew
        SET
          crew_name = ${name}
        WHERE
        user_id = ${user.id} AND crew_id = ${id}


      `;
  } catch (error) {
    return `Something went Wrong! Error: ${error} `;
  }

  revalidatePath("/dashboard/crews");
  redirect("/dashboard/crews");
}


export async function deleteCrew(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  await sql`
    DELETE FROM crew
    where user_id = ${user.id} and crew_id = ${id};
  `;

  revalidatePath("/dashboard/crews");
}



// Crew Member

const crewMemberSchema = z.object({
  crew_id: z.string(),
  employee_id: z.string(),
  role: z.string(),
});


export async function createCrewMember(formData: FormData) {
  const { crew_id, employee_id, role } = crewMemberSchema.parse({
    crew_id: formData.get('crew_id'),
    employee_id: formData.get('employee_id'),
    role: formData.get('role'),
  });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  try {
    await sql`
      INSERT INTO crew_member (user_id, crew_id, employee_id, role)
      VALUES (${user.id}, ${crew_id}, ${employee_id}, ${role})
    `;
  } catch (error) {
    return `Something went wrong. Try again. Error: ${error}`;
  }

  revalidatePath('/dashboard/crews');
  redirect('/dashboard/crews');
}



// Aircraft

const aircraftSchema = z.object({
  model: z.string(),
  manufacturer: z.string(),
  capacity: z.coerce.number(),
  maintenance_status: z.string(),
});


export async function createAircraft(formData: FormData) {
  const { model, manufacturer, capacity, maintenance_status } = aircraftSchema.parse({
    model: formData.get('model'),
    manufacturer: formData.get('manufacturer'),
    capacity: formData.get('capacity'),
    maintenance_status: formData.get('maintenance_status'),
  });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  try {
    await sql`
      INSERT INTO aircraft (user_id, model, manufacturer, capacity, maintenance_status, created_at)
      VALUES (${user.id}, ${model}, ${manufacturer}, ${capacity}, ${maintenance_status}, now())
    `;
  } catch (error) {
    return `Something went wrong. Try again. Error: ${error}`;
  }

  revalidatePath('/dashboard/aircrafts');
  redirect('/dashboard/aircrafts');
}



// Airport

const airportSchema = z.object({
  code: z.string(),
  name: z.string(),
  city: z.string(),
  country: z.string(),
});


export async function createAirport(formData: FormData) {
  const { code, name, city, country } = airportSchema.parse({
    code: formData.get('code'),
    name: formData.get('name'),
    city: formData.get('city'),
    country: formData.get('country'),
  });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  try {
    await sql`
      INSERT INTO airport (user_id, code, name, city, country, created_at)
      VALUES (${user.id}, ${code}, ${name}, ${city}, ${country}, now())
    `;
  } catch (error) {
    return `Something went wrong. Try again. Error: ${error}`;
  }

  revalidatePath('/dashboard/airports');
  redirect('/dashboard/airports');
}



// Flight

const flightSchema = z.object({
  flight_no: z.string(),
  status: z.string(),
  aircraft_id: z.string(),
  origin_airport_id: z.string(),
  destination_airport_id: z.string(),
});


export async function createFlight(formData: FormData) {
  const { flight_no, status, aircraft_id, origin_airport_id, destination_airport_id } =
    flightSchema.parse({
      flight_no: formData.get('flight_no'),
      status: formData.get('status'),
      aircraft_id: formData.get('aircraft_id'),
      origin_airport_id: formData.get('origin_airport_id'),
      destination_airport_id: formData.get('destination_airport_id'),
    });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  try {
    await sql`
      INSERT INTO flight 
        (user_id, flight_no, status, aircraft_id, origin_airport_id, destination_airport_id, created_at)
      VALUES
        (${user.id}, ${flight_no}, ${status}, ${aircraft_id}, ${origin_airport_id}, ${destination_airport_id}, now())
    `;
  } catch (error) {
    return `Something went wrong. Try again. Error: ${error}`;
  }

  revalidatePath('/dashboard/flights');
  redirect('/dashboard/flights');
}



// Flight Schedule

const flightScheduleSchema = z.object({
  crew_id: z.string(),
  flight_id: z.string(),
  arrival_time: z.string(),     // ISO timestamp string
  departure_time: z.string(),   // ISO timestamp string
  date: z.string(),             // ISO date string
});


export async function createFlightSchedule(formData: FormData) {
  const { crew_id, flight_id, arrival_time, departure_time, date } =
    flightScheduleSchema.parse({
      crew_id: formData.get('crew_id'),
      flight_id: formData.get('flight_id'),
      arrival_time: formData.get('arrival_time'),
      departure_time: formData.get('departure_time'),
      date: formData.get('date'),
    });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  try {
    await sql`
      INSERT INTO flight_schedule 
        (user_id, crew_id, flight_id, arrival_time, departure_time, date, created_at)
      VALUES
        (${user.id}, ${crew_id}, ${flight_id}, ${arrival_time}, ${departure_time}, ${date}, now())
    `;
  } catch (error) {
    return `Something went wrong. Try again. Error: ${error}`;
  }

  revalidatePath('/dashboard/flight-schedules');
  redirect('/dashboard/flight-schedules');
}