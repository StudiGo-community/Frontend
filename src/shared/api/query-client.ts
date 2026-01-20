import { isServer, QueryClient } from '@tanstack/react-query'

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
      },
    },
  })

let browserQueryClient: QueryClient | undefined = undefined

const getQueryClient = () => {
  if (isServer) return makeQueryClient()
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

export { getQueryClient }
