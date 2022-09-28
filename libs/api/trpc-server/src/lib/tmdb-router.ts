import { z } from 'zod'
import { createRouter } from './context'
import { MovieSchema, MoviesSchema, MovieType } from './MoviesSchema'

export const tmdbRouter = createRouter()
  .query('nowPlaying', {
    output: z.array(MovieSchema),
    input: z.void(),
    async resolve({ ctx }) {
      const url = 'movie/now_playing'
      const response = await fetch(
        `https://api.themoviedb.org/3/${url}?page=1`,
        {
          headers: {
            Authorization: ctx.TMDB_TOKEN,
          },
        }
      )
      const responseJson = await response.json()

      const movies = responseJson.results ?? []

      return movies.map((movie) => ({
        ...movie,
        posterImage: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        backdropImage: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
      }))
    },
  })
  .query('search', {
    output: z.array(MovieSchema),
    input: z.object({
      query: z.string(),
    }),
    async resolve({ ctx, input }) {
      const url = `search/movie?query=${input.query}`
      const response = await fetch(`https://api.themoviedb.org/3/${url}`, {
        headers: {
          Authorization: ctx.TMDB_TOKEN,
        },
      })

      const responseJson = await response.json()

      const movies = responseJson.results ?? []

      return movies.map((movie) => ({
        ...movie,
        posterImage: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        backdropImage: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
      }))
    },
  })
  .query('byId', {
    // output: MovieSchema.nullable(),
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      const url = `movie/${input.id}`
      const response = await fetch(`https://api.themoviedb.org/3/${url}`, {
        headers: {
          Authorization: ctx.TMDB_TOKEN,
        },
      })

      const responseJson = await response.json()

      const movie: MovieType = responseJson

      return {
        ...movie,
        posterImage: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        backdropImage: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
      }
    },
  })
  .query('creditsForMovieId', {
    // output: MovieSchema.nullable(),
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      const url = `movie/${input.id}/credits`
      const response = await fetch(`https://api.themoviedb.org/3/${url}`, {
        headers: {
          Authorization: ctx.TMDB_TOKEN,
        },
      })

      const responseJson = await response.json()

      const movie: MovieType = responseJson

      return movie
    },
  })
  .query('creditById', {
    // output: MovieSchema.nullable(),
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const url = `credit/${input.id}`
      const response = await fetch(`https://api.themoviedb.org/3/${url}`, {
        headers: {
          Authorization: ctx.TMDB_TOKEN,
        },
      })
      const responseJson = await response.json()

      const movie: MovieType = responseJson

      return movie
    },
  })
  .query('personById', {
    // output: MovieSchema.nullable(),
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      const url = `person/${input.id}`
      const response = await fetch(`https://api.themoviedb.org/3/${url}`, {
        headers: {
          Authorization: ctx.TMDB_TOKEN,
        },
      })
      const responseJson = await response.json()

      const movie: MovieType = responseJson

      return movie
    },
  })
