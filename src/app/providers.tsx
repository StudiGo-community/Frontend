'use client'

import { useEffect, useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'

import { getQueryClient } from '@/shared/api/query-client'
import { setupAuthInterceptors } from '@/entities/session/lib/setup-auth-interceptors'

interface ProvidersProps {
  children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  const [queryClient] = useState(() => getQueryClient())

  useEffect(() => {
    setupAuthInterceptors()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default Providers
