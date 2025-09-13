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

export async function createCrew(formData: FormData){
  const { name } = crewSchema.parse({
    name: formData.get("name"),
  });

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    await sql`
        insert into crew
        (user_id, crew_name)
        values(${user.id},${name});
      `;
  } catch (error) {
    return `Something went Wrong! Error: ${error} `;
  }

  revalidatePath("/dashboard/crews");
  revalidatePath("/dashboard/crew-members");
  redirect("/dashboard/crew-members/create");
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
  revalidatePath("/dashboard/crew-members");
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
  revalidatePath("/dashboard/crew-members");
}

const crewMemberSchema = z.object({
  crewId: z.string(),
  empId: z.string(),
  role: z.string()
})


export async function createCrewMember(formData: FormData) {
  const { crewId, empId, role } = crewMemberSchema.parse({
    crewId: formData.get("crewId"),
    empId: formData.get("employeeId"),
    role: formData.get("role")
  });

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    await sql`
        insert into crew_member
        (user_id, crew_id, employee_id, role)
        values(${user.id}, ${crewId},${empId}, ${role});
      `;
  } catch (error) {
    return `Something went Wrong! Error: ${error} `;
  }

  revalidatePath("/dashboard/crews");
  redirect("/dashboard/crew-members");
}


export async function updateCrewMember(formData: FormData, id: string) {
  const { crewId, empId, role } = crewMemberSchema.parse({
    crewId: formData.get("crewId"),
    empId: formData.get("employeeId"),
    role: formData.get("role"),
  });

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    await sql`
        Update crew_member
        SET
          crew_id = ${crewId},
          employee_id = ${empId},
          role = ${role}
        WHERE
        user_id = ${user.id} AND crew_id = ${id} AND employee_id = ${empId};


      `;
  } catch (error) {
    return `Something went Wrong! Error: ${error} `;
  }

  revalidatePath("/dashboard/crews");
  redirect("/dashboard/crews");
}


export async function deleteCrewMember(id1: string, id2: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  await sql`
    DELETE FROM crew_member
    where user_id = ${user.id} and crew_id = ${id1} and employee_id = ${id2};
  `;

  revalidatePath("/dashboard/crews");
}

// Aircraft

const aircraftSchema = z.object({
  model: z.string(),
  manufacturer: z.string(),
  capacity: z.coerce.number(),
  maintenance_status: z.string(),
})

export async function createAircraft(formData : FormData){
    const {model, manufacturer, capacity, maintenance_status} = aircraftSchema.parse({
        model: formData.get('model'),
        manufacturer: formData.get('manufacturer'),
        capacity: formData.get('capacity'),
        maintenance_status: formData.get('maintenance_status'),
    })

    const supabase = await createClient();

    const { data: {user}} = await supabase.auth.getUser()
    try{
      await sql`
          INSERT INTO aircraft (user_id, model, manufacturer, capacity, maintenance_status) 
          VALUES (${user.id}, ${model}, ${manufacturer}, ${capacity}, ${maintenance_status})
      `
    }catch(error){
      return `Something went wrong, Try Again. Error: ${error}`
    }
    
    revalidatePath('/dashboard/aircrafts')
    redirect('/dashboard/aircrafts')
}

export async function updateAircraft(formData:FormData, id: string) {
  const {model, manufacturer, capacity, maintenance_status} = aircraftSchema.parse({
        model: formData.get('model'),
        manufacturer: formData.get('manufacturer'),
        capacity: formData.get('capacity'),
        maintenance_status: formData.get('maintenance_status'),
    })

    const supabase = await createClient();

    const { data: {user}} = await supabase.auth.getUser();

    try{
      await sql`
        Update aircraft
        SET
          model = ${model},
          manufacturer = ${manufacturer},
          capacity = ${capacity},
          maintenance_status = ${maintenance_status}
        WHERE
        user_id = ${user.id} AND aircraft_id = ${id}
      `
      
    }catch(error){
      return `Something went Wrong! Error: ${error} `
    }

    revalidatePath('/dashboard/aircrafts')
    redirect('/dashboard/aircrafts')
}

export async function deleteAircraft(id : string){
  const supabase = await createClient();

  const { data: {user}} = await supabase.auth.getUser();
  
  
  await sql `
    DELETE FROM aircraft
    where user_id = ${user.id} and aircraft_id = ${id};
  `

  revalidatePath('/dashboard/aircrafts');
}

// Airport

const airportSchema = z.object({
  code: z.string(),
  name: z.string(),
  city: z.string(),
  country: z.string(),
})

export async function createAirport(formData : FormData){
    const {code, name, city, country} = airportSchema.parse({
        code: formData.get('code'),
        name: formData.get('name'),
        city: formData.get('city'),
        country: formData.get('country'),
    })

    const supabase = await createClient();

    const { data: {user}} = await supabase.auth.getUser()
    try{
      await sql`
          INSERT INTO airport (user_id, code, name, city, country) 
          VALUES (${user.id}, ${code}, ${name}, ${city}, ${country})
      `
    }catch(error){
      return `Something went wrong, Try Again. Error: ${error}`
    }
    
    revalidatePath('/dashboard/airports')
    redirect('/dashboard/airports')
}

export async function updateAirport(formData:FormData, id: string) {
  const {code, name, city, country} = airportSchema.parse({
        code: formData.get('code'),
        name: formData.get('name'),
        city: formData.get('city'),
        country: formData.get('country'),
    })

    const supabase = await createClient();

    const { data: {user}} = await supabase.auth.getUser();

    try{
      await sql`
        Update airport
        SET
          code = ${code},
          name = ${name},
          city = ${city},
          country = ${country}
        WHERE
        user_id = ${user.id} AND airport_id = ${id}
      `
      
    }catch(error){
      return `Something went Wrong! Error: ${error} `
    }

    revalidatePath('/dashboard/airports')
    redirect('/dashboard/airports')
}

export async function deleteAirport(id : string){
  const supabase = await createClient();

  const { data: {user}} = await supabase.auth.getUser();
  
  
  await sql `
    DELETE FROM airport
    where user_id = ${user.id} and airport_id = ${id};
  `

  revalidatePath('/dashboard/airports');
}

// Flight

const flightSchema = z.object({
  flight_no: z.string(),
  status: z.string(),
  aircraft_id: z.string(),
  origin_airport_id: z.string(),
  destination_airport_id: z.string(),
})

export async function createFlight(formData : FormData){
    const {flight_no, status, aircraft_id, origin_airport_id, destination_airport_id} = flightSchema.parse({
        flight_no: formData.get('flight_no'),
        status: formData.get('status'),
        aircraft_id: formData.get('aircraft_id'),
        origin_airport_id: formData.get('origin_airport_id'),
        destination_airport_id: formData.get('destination_airport_id'),
    })

    const supabase = await createClient();

    const { data: {user}} = await supabase.auth.getUser()
    try{
      await sql`
          INSERT INTO flight (user_id, flight_no, status, aircraft_id, origin_airport_id, destination_airport_id) 
          VALUES (${user.id}, ${flight_no}, ${status}, ${aircraft_id}, ${origin_airport_id}, ${destination_airport_id})
      `
    }catch(error){
      return `Something went wrong, Try Again. Error: ${error}`
    }
    
    revalidatePath('/dashboard/flights')
    redirect('/dashboard/flights')
}

export async function updateFlight(formData:FormData, id: string) {
  const {flight_no, status, aircraft_id, origin_airport_id, destination_airport_id} = flightSchema.parse({
        flight_no: formData.get('flight_no'),
        status: formData.get('status'),
        aircraft_id: formData.get('aircraft_id'),
        origin_airport_id: formData.get('origin_airport_id'),
        destination_airport_id: formData.get('destination_airport_id'),
    })

    const supabase = await createClient();

    const { data: {user}} = await supabase.auth.getUser();

    try{
      await sql`
        Update flight
        SET
          flight_no = ${flight_no},
          status = ${status},
          aircraft_id = ${aircraft_id},
          origin_airport_id = ${origin_airport_id},
          destination_airport_id = ${destination_airport_id}
        WHERE
        user_id = ${user.id} AND flight_id = ${id}
      `
      
    }catch(error){
      return `Something went Wrong! Error: ${error} `
    }

    revalidatePath('/dashboard/flights')
    redirect('/dashboard/flights')
}

export async function deleteFlight(id : string){
  const supabase = await createClient();

  const { data: {user}} = await supabase.auth.getUser();
  
  
  await sql `
    DELETE FROM flight
    where user_id = ${user.id} and flight_id = ${id};
  `

  revalidatePath('/dashboard/flights');
}

// Flight Schedule

const flightScheduleSchema = z.object({
  crew_id: z.string(),
  flight_id: z.string(),
  arrival_time: z.string(),
  departure_time: z.string(),
  date: z.string(),
})

export async function createFlightSchedule(formData : FormData){
    const {crew_id, flight_id, arrival_time, departure_time, date} = flightScheduleSchema.parse({
        crew_id: formData.get('crew_id'),
        flight_id: formData.get('flight_id'),
        arrival_time: formData.get('arrival_time'),
        departure_time: formData.get('departure_time'),
        date: formData.get('date'),
    })

    const supabase = await createClient();

    const { data: {user}} = await supabase.auth.getUser()
    try{
      await sql`
          INSERT INTO flight_schedule (user_id, crew_id, flight_id, arrival_time, departure_time, date) 
          VALUES (${user.id}, ${crew_id}, ${flight_id}, ${arrival_time}, ${departure_time}, ${date})
      `
    }catch(error){
      return `Something went wrong, Try Again. Error: ${error}`
    }
    
    revalidatePath('/dashboard/schedules')
    redirect('/dashboard/schedules')
}

export async function updateFlightSchedule(formData:FormData, id: string) {
  const {crew_id, flight_id, arrival_time, departure_time, date} = flightScheduleSchema.parse({
        crew_id: formData.get('crew_id'),
        flight_id: formData.get('flight_id'),
        arrival_time: formData.get('arrival_time'),
        departure_time: formData.get('departure_time'),
        date: formData.get('date'),
    })

    const supabase = await createClient();

    const { data: {user}} = await supabase.auth.getUser();

    try{
      await sql`
        Update flight_schedule
        SET
          crew_id = ${crew_id},
          flight_id = ${flight_id},
          arrival_time = ${arrival_time},
          departure_time = ${departure_time},
          date = ${date}
        WHERE
        user_id = ${user.id} AND schedule_id = ${id}
      `
      
    }catch(error){
      return `Something went Wrong! Error: ${error} `
    }

    revalidatePath('/dashboard/schedules')
    redirect('/dashboard/schedules')
}

export async function deleteFlightSchedule(id : string){
  const supabase = await createClient();

  const { data: {user}} = await supabase.auth.getUser();
  
  
  await sql `
    DELETE FROM flight_schedule
    where user_id = ${user.id} and schedule_id = ${id};
  `

  revalidatePath('/dashboard/schedules');
}