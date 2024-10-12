import { useAuth } from '@/components'
import { Button, ButtonText, Text } from '@/components/ui'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  const { email, user_id, logout } = useAuth()
  return (
    <SafeAreaView>
      <Text className="text-center">{user_id}</Text>
      <Text className="text-center">{email}</Text>
      <Button onPress={() => logout()}>
        <ButtonText>Deslogar</ButtonText>
      </Button>
    </SafeAreaView>
  )
}

export default Profile
