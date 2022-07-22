import { trpcClient } from './trpc-client'

describe('trpcClient', () => {
  it('should work', () => {
    expect(trpcClient()).toEqual('trpc-client')
  })
})
