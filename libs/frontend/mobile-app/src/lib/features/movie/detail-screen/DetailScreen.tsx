import React from 'react'
import { createParam } from 'solito'

import { Text, Box, VStack, Button, Spinner } from 'native-base'
import { trpc } from '@conference-demos/trpc-client'
import { InferQueryOutput } from '@conference-demos/trpc-server'
import { parseMovieId } from './parseMovieId'
import { stringifyMovieId } from './stringifyMovieId'
import { MoviePoster } from '../../home/MoviePoster'
import { WatchlistMovieScreenNavigationProps } from '../../../navigation/Navigation'

const { useParam } = createParam<{ id: number }>()

type MovieById = InferQueryOutput<'tmdb.byId'>

export function MovieDetailScreen({
  navigation,
}: WatchlistMovieScreenNavigationProps) {
  const [id] = useParam('id', {
    initial: 0,
    parse: parseMovieId,
    stringify: stringifyMovieId,
  })

  const { mutate: addToWatchlist, isLoading: addToWatchlistLoading } =
    trpc.useMutation(['user.addToWatchlist'])
  const { mutate: removeFromWatchlist, isLoading: removeFromWatchlistLoading } =
    trpc.useMutation(['user.removeFromWatchlist'])

  const { data, isLoading: isWatchlistLoading } = trpc.useQuery([
    'user.watchlist',
  ])
  const watchlist = data?.movies ?? []
  const utils = trpc.useContext()
  const movieResult = trpc.useQuery(['tmdb.byId', { id }], {
    enabled: id > 0,
  })

  const movie = movieResult.data

  let watchedMovieId = ''
  if (watchlist) {
    watchedMovieId = watchlist.find((m) => m.id === id)?.watchListId
  }

  React.useEffect(() => {
    navigation.setOptions({ title: movie?.title ?? 'Movie' })
  }, [movie?.title, navigation])

  if (!movieResult) return null

  function handleWatched(movie: MovieById) {
    if (!movie) {
      return
    }

    addToWatchlist(
      { id: movie.id.toString() },
      {
        onSuccess() {
          utils.invalidateQueries(['user.watchlist'])
        },
      }
    )
  }

  function removeWatched(watchlistId: string) {
    removeFromWatchlist(
      { id: watchlistId },
      {
        onSuccess() {
          utils.invalidateQueries(['user.watchlist'])
        },
      }
    )
  }

  if (movieResult.error) {
    return <Text>Error: {movieResult.error.message}</Text>
  }

  return movie ? (
    <VStack
      height={'full'}
      _dark={{
        backgroundColor: '#000',
      }}
    >
      <Box
        height="100%"
        width={'100%'}
        p={2}
        display={'flex'}
        flexDirection="column"
        justifyContent="space-between"
      >
        <MoviePoster item={movie} showOverview />
        {isWatchlistLoading ? (
          <Spinner />
        ) : watchedMovieId ? (
          <Button
            onPress={() => removeWatched(watchedMovieId)}
            isLoading={removeFromWatchlistLoading}
          >
            Remove from watchlist
          </Button>
        ) : (
          <Button
            onPress={() => handleWatched(movie)}
            isLoading={addToWatchlistLoading}
          >
            I've watched this!
          </Button>
        )}
      </Box>
    </VStack>
  ) : null
}
