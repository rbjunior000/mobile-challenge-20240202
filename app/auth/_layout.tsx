import { HStack, Image, VStack } from '@/components/ui'
import { Slot } from 'expo-router'
import { SafeAreaView, ScrollView } from 'react-native'

type AuthLayoutProps = {
  children: React.ReactNode
}

const AuthLayout = (props: AuthLayoutProps) => {
  return (
    <SafeAreaView className="w-full h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <HStack className="w-full bg-background-0 flex-1 justify-center">
          <VStack className="relative hidden md:flex flex-1 items-center justify-center" space="md">
            <Image height={100} width={100} source={require('@/assets/images/radialGradient.png')} className="object-cover h-full w-full" alt="Radial Gradient" />
          </VStack>
          <VStack className="md:items-center md:justify-center flex-1 w-full p-9 md:gap-10 gap-16 md:m-auto md:w-1/2">
            <Slot />
          </VStack>
        </HStack>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AuthLayout
