import {
  Button,
  ButtonIcon,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Link,
  LinkText,
  Text,
  VStack
} from '@/components/ui'
import { SignInInput, userService } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { AlertTriangle, EyeIcon, EyeOffIcon, User } from 'lucide-react-native'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { toast } from 'sonner-native'
import { z } from 'zod'

const loginSchema = z.object({
  password: z.string().min(8),
  email: z.string().email()
})

type LoginSchemaType = z.infer<typeof loginSchema>

export const Login = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema)
  })

  const { mutate } = useMutation({
    mutationFn: (input: SignInInput) => userService.signIn(input)
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

  const onSubmit = ({ email, password }: LoginSchemaType) => {
    mutate(
      {
        email,
        password
      },
      {
        onSuccess: () => {
          router.push('/(protected)/')
        },
        onError: ({ message }) => {
          toast.error(message)
        }
      }
    )
  }
  const handleKeyPress = () => {
    Keyboard.dismiss()
    handleSubmit(onSubmit)()
  }
  const router = useRouter()
  return (
    <VStack className="max-w-[440px] w-full" space="md">
      <VStack className="md:items-center" space="md">
        <VStack>
          <Heading className="md:text-center" size="3xl">
            Log in
          </Heading>
          <Text>Login to start using gluestack</Text>
        </VStack>
      </VStack>
      <VStack className="w-full">
        <VStack space="xl" className="w-full">
          <FormControl isInvalid={!!errors?.email} className="w-full">
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="email"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField placeholder="Enter email" value={value} onChangeText={onChange} onBlur={onBlur} onSubmitEditing={handleKeyPress} returnKeyType="done" />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon as={AlertTriangle} />
              <FormControlErrorText>{errors?.email?.message && 'Email ID not found'}</FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl isInvalid={!!errors.password} className="w-full">
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="password"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                  />
                  <InputSlot onPress={handleState} className="pr-3">
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon as={AlertTriangle} />
              <FormControlErrorText>{errors?.password?.message && 'Password was incorrect'}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        </VStack>
        <VStack className="w-full my-7 " space="lg">
          <Button className="w-full" onPress={handleSubmit(onSubmit)}>
            <ButtonText className="font-medium">Log in</ButtonText>
          </Button>
          <Button variant="outline" action="secondary" className="w-full gap-1" onPress={() => {}}>
            <ButtonText className="font-medium">Continue with Google</ButtonText>
            <ButtonIcon as={User} />
          </Button>
        </VStack>
        <HStack className="self-center" space="sm">
          <Text size="md">Don't have an account?</Text>
          <Link href="/auth/signup">
            <LinkText className="font-medium text-primary-700 group-hover/link:text-primary-600  group-hover/pressed:text-primary-700" size="md">
              Sign up
            </LinkText>
          </Link>
        </HStack>
      </VStack>
    </VStack>
  )
}
