'use client'

import { useEffect, useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'

import { getQueryClient } from '@/shared/api/query-client'
import { setupAuthInterceptors } from '@/features/auth-login/lib/setup-auth-interceptors'
import { ChatSocketProvider } from '@/features/chat-message-subscribe/model/ChatSocketProvider'

interface ProvidersProps {
  children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  const [queryClient] = useState(() => getQueryClient())

  useEffect(() => {
    setupAuthInterceptors()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ChatSocketProvider>{children}</ChatSocketProvider>
    </QueryClientProvider>
  )
}

export default Providers
