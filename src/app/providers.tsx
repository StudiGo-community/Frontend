'use client'

import { getQueryClient } from '@/shared/api/query-client'
import { QueryClientProvider } from '@tanstack/react-query'

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default Providers
