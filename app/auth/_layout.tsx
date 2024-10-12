import { HStack, Image, VStack } from '@/components/ui'
import { Slot } from 'expo-router'
import { SafeAreaView, ScrollView } from 'react-native'

type AuthLayoutProps = {
  children: React.ReactNode
}

const AuthLayout = (props: AuthLayoutProps) => {
  return (
    <SafeAreaView className="w-full h-full">
      <ScrollView className="w-full h-full" contentContainerStyle={{ flexGrow: 1 }}>
        <HStack className="w-full h-full bg-background-0 flex-grow justify-center">
          <VStack className="relative hidden md:flex h-full w-full flex-1  items-center  justify-center" space="md">
            <Image height={100} width={100} source={require('@/assets/images/radialGradient.png')} className="object-cover h-full w-full" alt="Radial Gradient" />
          </VStack>
          <VStack className="md:items-center md:justify-center flex-1 w-full  p-9 md:gap-10 gap-16 md:m-auto md:w-1/2 h-full">
            <Slot />
          </VStack>
        </HStack>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AuthLayout
