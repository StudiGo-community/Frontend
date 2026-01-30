'use client'

import { useEffect, useState } from 'react'
import Header from '@/widgets/auth-header/ui/header'
import { useTokenStore } from '@/entities/session/store/token-store'

export const HeaderWrapper = () => {
  const [initialized, setInitialized] = useState(false)
  const accessToken = useTokenStore((state) => state.accessToken)
  const isLoggedIn = !!accessToken

  // TODO: 실제 API 연동 및 SSR 인증 구조 적용 시 zustand 토큰 복구 및 로딩 처리 코드를 제거.
  useEffect(() => {
    useTokenStore.getState().initializeToken()
    setTimeout(() => setInitialized(true), 0)
  }, [])

  if (!initialized) {
    return <div />
  }
  // 여기까지

  return <Header isLoggedIn={isLoggedIn} />
}
