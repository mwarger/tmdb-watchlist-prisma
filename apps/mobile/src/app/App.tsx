import { LogBox } from 'react-native'
import React from 'react'
import { Provider, RootNavigator } from '@conference-demos/frontend-mobile-app'
import * as SplashScreen from 'expo-splash-screen'
if (__DEV__) {
  // debugging with Reactotron
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

export default function App() {
  React.useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync()

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      }
    }

    prepare()
  }, [])

  return (
    <Provider>
      <RootNavigator />
    </Provider>
  )
}

LogBox.ignoreLogs([
  "Can't perform a React state update on an unmounted component",
])
