import type { AppRouter } from '@conference-demos/trpc-server'
import { createTRPCClient } from '@trpc/client'
import { createReactQueryHooks } from '@trpc/react'
// import superjson from 'superjson';

export const client = createTRPCClient<AppRouter>({
  url: process.env.API_ENDPOINT,
  // transformer: superjson,
})

export const trpc = createReactQueryHooks<AppRouter>()
