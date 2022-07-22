import { prismaClient } from './prisma-client'

describe('prismaClient', () => {
  it('should work', () => {
    expect(prismaClient()).toEqual('prisma-client')
  })
})
