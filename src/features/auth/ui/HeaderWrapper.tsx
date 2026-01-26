'use client'

import { useTokenStore } from '@/features/auth'
import Header from '@/shared/ui/header/Header'

export const HeaderWrapper = () => {
  const accessToken = useTokenStore((state) => state.accessToken)
  const isLoggedIn = !!accessToken
  return <Header isLoggedIn={isLoggedIn} />
}
