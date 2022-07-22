import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  LinkingOptions,
} from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { useMemo } from 'react'
import { parseMovieId } from '../features/movie/detail-screen/parseMovieId'
import { stringifyMovieId } from '../features/movie/detail-screen/stringifyMovieId'

import { useColorMode } from 'native-base'
import { WatchlistStackParams } from '../navigation/Navigation'

const linking: LinkingOptions<WatchlistStackParams> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      HomeStack: {
        screens: {
          NowPlaying: 'nowPlaying',
          MyWatchlist: 'watchlist',
        },
      },
      Details: {
        parse: {
          id: parseMovieId,
        },
        stringify: { id: stringifyMovieId },
        path: 'movie/:id',
      },
    },
  },
}

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { colorMode } = useColorMode()
  return (
    <NavigationContainer
      theme={colorMode === 'dark' ? DarkTheme : DefaultTheme}
      linking={useMemo(() => linking, [])}
    >
      {children}
    </NavigationContainer>
  )
}
