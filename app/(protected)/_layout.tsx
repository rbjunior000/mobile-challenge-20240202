import { AuthProvider, WordDetails } from '@/components'
import { Text } from '@/components/ui'
import { useAsyncStorage } from '@/hooks'
import { supabase } from '@/services/supabase'
import { Session, User } from '@supabase/supabase-js'
import { Tabs, useRouter } from 'expo-router'
import { History, Stars, User as UserIcon, WholeWord } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'

const ProtectedLayout = () => {
  const { push } = useRouter()
  const [user, setUser] = useState<User | null>()
  const [storedSession, setStoredSession, isLoading] = useAsyncStorage<Session | null>('supabaseSession', null)

  useEffect(() => {
    const getSession = async () => {
      if (storedSession) {
        setUser(storedSession.user)
      } else {
        const {
          data: { session }
        } = await supabase.auth.getSession()
        setUser(session?.user || null)

        if (session) {
          await setStoredSession(session)
        } else {
          push('/auth/login')
        }
      }

      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        switch (event) {
          case 'SIGNED_IN':
            setUser(session?.user)
            await setStoredSession(session)
            break
          case 'SIGNED_OUT':
            setUser(null)
            await setStoredSession(null)
            break
          default:
        }
      })

      return () => {
        authListener.subscription.unsubscribe()
      }
    }

    getSession()
  }, [storedSession])

  const logout = async () => {
    await setStoredSession(null)
    await supabase.auth.signOut()
  }

  if (isLoading) {
    return <Text>Loading Autentication...</Text>
  }

  return (
    <AuthProvider
      user={{
        email: user?.email as string,
        id: user?.id as string
      }}
      logout={logout}
    >
      <WordDetails />
      <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Words',
            tabBarIcon: ({ color }) => <WholeWord size={28} color={color} />
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: 'Favorites',
            tabBarIcon: ({ color }) => <Stars size={28} color={color} />
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'History',
            tabBarIcon: ({ color }) => <History size={28} color={color} />
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <UserIcon size={28} color={color} />
          }}
        />
      </Tabs>
    </AuthProvider>
  )
}

export default ProtectedLayout
