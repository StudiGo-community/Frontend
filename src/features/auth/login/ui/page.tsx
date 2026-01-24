'use client'

import KakaoIcon from '@/features/auth/assets/kakao-icon.svg'
import GoogleIcon from '@/features/auth/assets/google-icon.svg'

import { Button } from '@/shared/ui/Button'
import LoginForm from '@/features/auth/login/ui/LoginForm'

export default function LoginPage() {
  const handleKakaoStart = () => {
    window.location.assign('/auth/social/kakao?code=MOCK_KAKAO_CODE')
  }

  return (
    <main className="bg-brand-white flex min-h-dvh items-center justify-center px-4 py-10 sm:py-14">
      <section className="w-full max-w-sm sm:max-w-md">
        <header className="text-center">
          <h1 className="text-brand-black text-3xl font-bold">StudiGo</h1>
          <p className="text-brand-black mt-2 text-2xl leading-10 font-semibold">
            로그인
          </p>
        </header>

        <div className="mt-8 space-y-3">
          <Button
            type="button"
            size="reg"
            style={{ backgroundColor: '#FEE500', color: '#1E1919' }}
            className="w-full cursor-pointer hover:opacity-90"
            onClick={handleKakaoStart}
          >
            <KakaoIcon className="mr-2 size-5 shrink-0 overflow-visible" />
            카카오로 시작하기
          </Button>

          <Button
            type="button"
            size="reg"
            variant="outline"
            className="hover:bg-brand-gray-100 hover:border-brand-gray-400 w-full"
            disabled
            title="구글 로그인은 다음 커밋에서 연결 예정"
          >
            <GoogleIcon className="mr-2 size-5 shrink-0 overflow-visible" />
            구글로 시작하기
          </Button>
        </div>

        <LoginForm />
      </section>
    </main>
  )
}
