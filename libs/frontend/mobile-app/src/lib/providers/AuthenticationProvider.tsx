import React, { Dispatch, SetStateAction } from 'react'

/* eslint-disable-next-line */
export interface AuthenticationProviderProps {
  children: React.ReactNode
}

type UserDataType = {
  hasUser: boolean
  username: string
}
export const AuthenticatedUserContext = React.createContext<
  | {
      userData: UserDataType
      setUser: Dispatch<SetStateAction<UserDataType>>
    }
  | undefined
>(undefined)

export function AuthenticationProvider({
  children,
}: AuthenticationProviderProps) {
  const [userData, setUser] = React.useState({ hasUser: false, username: '' })

  return (
    <AuthenticatedUserContext.Provider
      value={{
        userData,
        setUser,
      }}
    >
      {children}
    </AuthenticatedUserContext.Provider>
  )
}

export const useAuthenticatedUser = () => {
  const context = React.useContext(AuthenticatedUserContext)

  if (context === undefined) {
    throw new Error(
      'useAuthenticatedUser must be used within a AuthenticationProvider'
    )
  }

  return context
}
