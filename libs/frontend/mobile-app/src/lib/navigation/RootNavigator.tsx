import React from 'react'
import { useAuthenticatedUser } from '../providers/AuthenticationProvider'
import { Center, Spinner, View } from 'native-base'
import { AuthStack } from './AuthStack'
import { WatchlistStack } from './Navigation'
import * as SplashScreen from 'expo-splash-screen'
import reactotron from 'reactotron-react-native'

export function RootNavigator() {
  reactotron.log?.('RootNavigator')

  const { userData } = useAuthenticatedUser()
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const onLayoutRootView = React.useCallback(async () => {
    if (!isLoading) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
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
