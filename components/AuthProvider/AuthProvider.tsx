import React, { createContext, PropsWithChildren, useContext } from 'react'

type User = {
  email: string
  id: string
}
type AuthContextProps = {
  email: string
  user_id: string
  logout: () => void
}

type AuthProvider = {
  user: User
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | null>(null)

export const useAuth = () => useContext(AuthContext) as AuthContextProps

export const AuthProvider = ({ children, user, logout }: PropsWithChildren<AuthProvider>) => {
  return (
    <AuthContext.Provider
      value={{
        email: user.email,
        user_id: user.id,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
