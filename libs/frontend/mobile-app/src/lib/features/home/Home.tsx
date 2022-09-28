import React from 'react'
import { Center, Spinner, Text } from 'native-base'
import { trpc } from '@conference-demos/trpc-client'
import { MovieList } from '../../navigation/MovieList'

export function NowPlayingScreen() {
  const { data, error, isLoading } = trpc.useQuery(['tmdb.nowPlaying'])

  if (error) {
    console.log('error', error)

    return <Text>Error: {error.message}</Text>
  }

  if (isLoading)
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    )
  if (!data)
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    )

  const movieData = data

  return <MovieList movieData={movieData} />
}
