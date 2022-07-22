import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Button, Center } from 'native-base'
import reactotron from 'reactotron-react-native'
import { useAuthenticatedUser } from '../providers/AuthenticationProvider'

const Stack = createNativeStackNavigator()

function LoginScreen() {
  const { setUser } = useAuthenticatedUser()
  const [loading, setLoading] = React.useState(false)
  // render button for anonymous signin
  const signInAnonymously = React.useCallback(async () => {
    try {
      setLoading(true)

      setUser({ hasUser: true })
    } catch (error) {
      reactotron.log?.('signInAnonymously error', error)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [setUser])

  return (
    <Center flex={1}>
      <Button
        onPress={signInAnonymously}
        isLoading={loading}
        isLoadingText="Reticulating Splines"
      >
        Sign in anonymously
      </Button>
    </Center>
  )
}

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  )
}
