'use client'

import { getAccessToken } from '@/features/auth'
import Header from '@/shared/ui/header/Header'

export const HeaderWrapper = () => {
  const token = getAccessToken()
  const isLoggedIn = !!token

  return <Header isLoggedIn={isLoggedIn} />
}
