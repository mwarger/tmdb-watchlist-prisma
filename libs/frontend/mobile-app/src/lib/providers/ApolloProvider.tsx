import React, { ReactNode } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as AProvider,
} from '@apollo/client'
import auth from '@react-native-firebase/auth'

export const ApolloProvider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = React.useState<ApolloClient<any> | null>(null)

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async (user) => {
      const token =
        (await auth().currentUser?.getIdTokenResult(true))?.token ?? ''

      const client = new ApolloClient({
        uri: 'https://tmdb-watchlist.hasura.app/v1/graphql',
        cache: new InMemoryCache(),
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      })

      setClient(client)
    })

    return subscriber
  }, [])

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!client) return <>{children}</>

  return <AProvider client={client}>{children}</AProvider>
}
