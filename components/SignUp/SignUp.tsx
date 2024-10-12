import { SignUpInput, userService } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { toast } from 'sonner-native'
import { z } from 'zod'
import { Form } from '../Form'
import { Box, Button, ButtonSpinner, ButtonText, Text, VStack } from '../ui'

const schema = z
  .object({
    password: z.string().min(8),
    email: z.string().email(),
    confirmPassword: z.string().min(8)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
  })

type Values = z.infer<typeof schema>

export const SignUp = () => {
  const { push } = useRouter()
  const form = useForm<Values>({
    resolver: zodResolver(schema)
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (input: SignUpInput) => userService.signUp(input)
  })

  const onSubmit = ({ email, password }: Values) => {
    mutate(
      {
        email,
        password
      },
      {
        onSuccess: () => {
          toast.success('Please check your e-mail for confirm your account')
          push('/auth/login')
        },
        onError: ({ message }) => toast.error(message)
      }
    )
  }

  const handleKeyPress = () => {
    Keyboard.dismiss()
    form.handleSubmit(onSubmit)()
  }

  return (
    <FormProvider {...form}>
      <Box className="flex max-w-[440px] w-full flex-col justify-center items-center min-h-screen p-4">
        <Text className="text-2xl mb-6 font-bold text-gray-800">Sign up</Text>
        <Box className="w-full max-w-md mb-4">
          <Form.Text onSubmitEditing={handleKeyPress} label="Email" placeholder="Your email" name="email" />
        </Box>
        <Box className="w-full max-w-md mb-4">
          <Form.Passowrd onSubmitEditing={handleKeyPress} label="Password" placeholder="Your password" name="password" />
        </Box>
        <Box className="w-full max-w-md mb-4">
          <Form.Passowrd onSubmitEditing={handleKeyPress} label="Confirm Password" placeholder="Confirm password" name="confirmPassword" />
        </Box>
        <VStack className="w-full gap-4 max-w-md">
          <Button variant="solid" className="w-full" onPress={form.handleSubmit(onSubmit)}>
            {isPending && <ButtonSpinner />}
            <ButtonText>Sign Up</ButtonText>
          </Button>
          <Link className="w-full" href="/auth/login">
            <Button variant="link" className="w-full">
              <ButtonText>Sign In</ButtonText>
            </Button>
          </Link>
        </VStack>
      </Box>
    </FormProvider>
  )
}
