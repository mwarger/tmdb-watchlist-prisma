import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import { MovieDetailScreen } from '../features/movie/detail-screen/DetailScreen'
import React from 'react'
import { NavigatorScreenParams } from '@react-navigation/native'
import { HomeStackTabs, TabNavigation } from './TabStack'

export type WatchlistStackParams = {
  HomeStack: NavigatorScreenParams<HomeStackTabs>
  Details: {
    id: string
  }
}

export type WatchlistMovieScreenNavigationProps = NativeStackScreenProps<
  WatchlistStackParams,
  'Details'
>

const Stack = createNativeStackNavigator<WatchlistStackParams>()

export function WatchlistStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        component={TabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Details" component={MovieDetailScreen} />
    </Stack.Navigator>
  )
}
