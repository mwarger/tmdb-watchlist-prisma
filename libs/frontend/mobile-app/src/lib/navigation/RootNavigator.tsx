import React from 'react'
import { useAuthenticatedUser } from '../providers/AuthenticationProvider'
import { Center, Spinner, View } from 'native-base'
import { AuthStack } from './AuthStack'
import { WatchlistStack } from './Navigation'
import * as SplashScreen from 'expo-splash-screen'
import reactotron from 'reactotron-react-native'
import { trpc } from '@conference-demos/trpc-client'

export function RootNavigator() {
  reactotron.log?.('RootNavigator')

  const syncAccount = trpc.useMutation(['user.syncAccount'], {}).mutateAsync
  const { userData } = useAuthenticatedUser()
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function syncUser() {
      try {
        await syncAccount()
      } catch (error) {
        console.log('syncUser error', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (userData.hasUser && userData.username) {
      syncUser()
    } else {
      setIsLoading(false)
    }
  }, [syncAccount, userData.hasUser, userData.username])

  const onLayoutRootView = React.useCallback(async () => {
    if (!isLoading) {
      await SplashScreen.hideAsync()
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    )
  }

  return (
    <View
      display="flex"
      flex={1}
      onLayout={onLayoutRootView}
      backgroundColor="black"
    >
      {userData?.hasUser ? <WatchlistStack /> : <AuthStack />}
    </View>
  )
}
