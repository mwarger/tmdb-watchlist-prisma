import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { prisma } from '@conference-demos/prisma-client'

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const TMDB_TOKEN = 'Bearer ' + process.env['TMDB_BEARER_TOKEN']

  const response = { req, res, prisma, TMDB_TOKEN }

  return response
}

type Context = trpc.inferAsyncReturnType<typeof createContext>

export const createRouter = () => trpc.router<Context>()
