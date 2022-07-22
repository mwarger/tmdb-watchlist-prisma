import React from 'react'
import { Center, Spinner, Text } from 'native-base'
import { trpc } from '@conference-demos/trpc-client'
import { MovieList } from './MovieList'
import { TextLink } from 'solito/link'

export function MyWatchlist() {
  const { data, error, isLoading } = trpc.useQuery(['user.watchlist'])

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

  const movieData = data.movies

  // show nothing if no movies
  if (!movieData.length)
    return (
      <Center flex={1}>
        <Text>
          No movies to show. Find a movie in{' '}
          <TextLink href="/nowPlaying">
            <Text color="primary.500">Now Playing</Text>
          </TextLink>
        </Text>
      </Center>
    )

  return <MovieList movieData={movieData} />
}
