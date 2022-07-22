import { z } from 'zod'
import { createRouter } from './context'
import {
  createWatchlistItem,
  deleteWatchlistItem as prismaDeleteWatchlistItem,
  getWatchlist,
} from '@conference-demos/prisma-client'

export const userDataRouter = createRouter()
  .mutation('addToWatchlist', {
    output: z.void(),
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      createWatchlistItem({
        movieId: input.id,
        userId: '123',
      })
    },
  })
  .mutation('removeFromWatchlist', {
    output: z.void(),
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      await prismaDeleteWatchlistItem(input.id)
    },
  })
  .query('watchlist', {
    input: z.void(),
    async resolve({ ctx }) {
      const uid = '123'

      const watchlist = await getWatchlist(uid)

      // make movie promises for each movie in watchlist
      const moviePromises =
        watchlist?.watchList.map(({ movieId }) =>
          fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
            headers: {
              Authorization: ctx.TMDB_TOKEN,
            },
          })
        ) ?? []

      // wait for all movie promises to resolve
      const moviesResults = await Promise.all(moviePromises)

      // get movies from results
      const moviesJsonPromises = moviesResults.map((response) =>
        response.json()
      )

      // wait for all movies to resolve
      const moviesJson = await Promise.all(moviesJsonPromises)

      const movies = moviesJson ?? []

      return {
        movies: movies.map((movie) => {
          let watchListId = ''
          watchListId =
            watchlist.watchList.find(
              (watchlistItem) => watchlistItem.movieId === movie.id.toString()
            )?.id ?? ''

          return {
            ...movie,
            posterImage: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            backdropImage: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
            watchListId,
          }
        }),
      }
    },
  })
