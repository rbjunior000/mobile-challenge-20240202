import { supabase } from '../supabase'
import { UserService } from './types'

export const userService: UserService = {
  me: async () => {
    const user = await supabase.auth.getUser()
    return {
      email: user.data.user?.email as string,
      id: user.data.user?.id as string
    }
  },
  signIn: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      throw new Error(error.message)
    }

    return {
      access_token: data?.session?.access_token as string,
      user: {
        email: data.user?.email as string,
        id: data.user?.id as string
      }
    }
  },
  signUp: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) {
      throw new Error(error.message)
    }
    return {
      email: data.user?.email as string,
      id: data.user?.id as string
    }
  }
}
