'use client'

import MyPage from '@/features/mypage/ui/MyPage'
import { Suspense } from 'react'

export default function Page() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <MyPage />
      </Suspense>
    </main>
  )
}
