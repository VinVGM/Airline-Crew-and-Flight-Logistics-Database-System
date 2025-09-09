'use server';

import { z } from 'zod';
import postgres from 'postgres';

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

    await sql`
        INSERT INTO employee (user_id, name, designation, dob, license_number, experience) 
        VALUES (${user_id}, ${name}, ${designation}, ${new_dob}, ${license_number}, ${experience})
    `   
    
}