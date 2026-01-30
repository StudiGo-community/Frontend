import { SocialCallback } from '@/features/auth-social/SocialCallback'
import { Suspense } from 'react'

export default function KakaoSocialPage() {
  return (
    <Suspense fallback={<div>카카오 로그인 처리중...</div>}>
      <SocialCallback provider="kakao" />
    </Suspense>
  )
}
