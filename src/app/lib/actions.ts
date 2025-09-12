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
      return "Something went wrong, Try Again. Error: "
    }
    
    revalidatePath('/dashboard/employees')
    redirect('/dashboard/employees')

    
}