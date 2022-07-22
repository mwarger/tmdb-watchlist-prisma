import React from 'react'
import NativeBaseProvider from '../native-base/NativeBaseProvider'
import { NavigationProvider } from './NavigationProvider'
import { AuthenticationProvider } from './AuthenticationProvider'
import { TRPCProvider } from './TRPCProvider'

export interface ProviderProps {
  children: React.ReactNode
}

export function Provider({ children }: ProviderProps) {
  return (
    <AuthenticationProvider>
      <TRPCProvider>
        <NativeBaseProvider>
          <NavigationProvider>{children}</NavigationProvider>
        </NativeBaseProvider>
      </TRPCProvider>
    </AuthenticationProvider>
  )
}

export default Provider
