'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/supabase/server'
import { sql } from '@/app/lib/db'
import { z } from 'zod'



export async function login(formData: FormData) {
  const supabase = await createClient()

    const credentials = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
    };
    const parsedCredentials = z.object(
        {
            email: z.string().email(),
            password: z.string().min(6)
        }
    ).safeParse(credentials)

    if(parsedCredentials.success){
        

        const { error } = await supabase.auth.signInWithPassword(credentials)

        if (error) {
            return error.message as string
        }

        const redirectTo = (formData.get('redirectTo') as string) || '/'
        revalidatePath('/', 'layout')
        redirect(redirectTo)
    }else{
        return "Invalid Credentials"
    }

  

  
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const credentials = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string
  }

  const parsedCredentials = z.object(
        {
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6)
        }
    ).safeParse(credentials)
  
  if(parsedCredentials.success){
        console.log(" signed up success")
        

        const { data, error } = await supabase.auth.signUp(credentials)

        if (error) {
            
            return "Something went wrong: " + error.message as string
        }else{
            await sql`
            INSERT INTO users (id, name, email)
            VALUES (${data!.user!.id}, ${credentials.name}, ${credentials.email})
            `
        }

        const redirectTo = (formData.get('redirectTo') as string) || '/dashboard'
        revalidatePath('/', 'layout')
        redirect(redirectTo)
    }else{
        return "Invalid Credentials"
   }
}


export async function signOut() {
    const supabase = await createClient()
    const { error } =  await supabase.auth.signOut();
    
    if(error){
        console.log("Error in signing out")
    }else{
        console.log("Successfully signed out")
        redirect('/login');
    }
}