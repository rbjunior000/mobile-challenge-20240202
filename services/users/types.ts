type User = {
  email: string
  id: string
}

export type SignInOutput = {
  access_token: string
  user: User
}

export type SignInInput = {
  email: string
  password: string
}

export type SignUpInput = {
  email: string
  password: string
}

export type UserService = {
  signIn: (input: SignInInput) => Promise<SignInOutput>
  signUp: (input: SignUpInput) => Promise<User>
  me: () => Promise<User>
}
