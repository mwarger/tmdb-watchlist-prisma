// src/server/router/index.ts
import { createRouter } from './context'
// import superjson from 'superjson';

import { tmdbRouter } from './tmdb-router'
import { userDataRouter } from './user-router'

export const appRouter = createRouter()
  // .transformer(superjson)
  .merge('tmdb.', tmdbRouter)
  .merge('user.', userDataRouter)

// export type definition of API
export type AppRouter = typeof appRouter
