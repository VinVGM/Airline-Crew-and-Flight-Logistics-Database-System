'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { createClient } from '@/supabase/server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});


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


const crewSchema = z.object({
  name : z.string()
})

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