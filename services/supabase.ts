import { createClient } from '@supabase/supabase-js'
import { Database } from './db-types'

console.log({ envs: process.env.SUPABASE_URL })
export const supabase = createClient<Database>(process.env.EXPO_PUBLIC_API_URL as string, process.env.EXPO_PUBLIC_API_KEY as string)
