'use client'

import LoginPage from '@/features/auth-login/ui/page'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  )
}
