'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { postKakaoOAuth } from '@/features/auth/api/endpoints/oauth'

interface SocialCallbackProps {
  provider: 'kakao'
}

export function SocialCallback({ provider }: SocialCallbackProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const run = async () => {
      const code = searchParams.get('code')
      if (!code) {
        router.replace('/auth/login')
        return
      }

      const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI
      if (!redirectUri) {
        router.replace('/auth/login')
        return
      }

      const result = await postKakaoOAuth({
        authorization_code: code,
        redirect_uri: redirectUri,
      })

      if (result.is_new_user === false) {
        localStorage.setItem('access_token', result.access_token)
        localStorage.setItem('token_type', result.token_type)
        localStorage.setItem('expires_in', String(result.expires_in))
        localStorage.setItem('user', JSON.stringify(result.user))

        router.replace('/')
        return
      }

      if (result.temporary_token) {
        sessionStorage.setItem(
          `${provider}_temporary_token`,
          result.temporary_token
        )
      }

      router.replace('/auth/join')
    }

    run().catch(() => router.replace('/auth/login'))
  }, [provider, router, searchParams])

  return (
    <main className="flex min-h-dvh items-center justify-center">
      <p className="text-brand-gray-500 text-sm">카카오 로그인 처리 중...</p>
    </main>
  )
}
