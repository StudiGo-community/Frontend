'use client'

import Link from 'next/link'
import { Button } from '@/shared/ui/Button'

import KakaoIcon from '@/shared/assets/kakao-icon.svg'
import GoogleIcon from '@/shared/assets/google-icon.svg'

export function StartStep(props: {
  onKakao: () => void
  onGoogle: () => void
  onStartEmail: () => void
}) {
  return (
    <div className="space-y-3">
      <Button
        type="button"
        size="reg"
        style={{ backgroundColor: '#FEE500', color: '#1E1919' }}
        className="w-full cursor-pointer hover:opacity-90"
        onClick={props.onKakao}
      >
        <KakaoIcon className="mr-2 size-5 shrink-0 overflow-visible" />
        카카오로 시작하기
      </Button>

      <Button
        type="button"
        size="reg"
        variant="outline"
        className="hover:bg-brand-gray-100 hover:border-brand-gray-400 w-full cursor-pointer"
        onClick={props.onGoogle}
      >
        <GoogleIcon className="mr-2 size-5 shrink-0 overflow-visible" />
        구글로 시작하기
      </Button>

      <div className="my-6 flex items-center gap-4">
        <div className="bg-brand-gray-200 h-px flex-1" />
        <span className="text-brand-gray-300 text-sm">또는</span>
        <div className="bg-brand-gray-200 h-px flex-1" />
      </div>

      <Button
        type="button"
        size="reg"
        className="bg-brand-black text-brand-white w-full cursor-pointer hover:opacity-90"
        onClick={props.onStartEmail}
      >
        이메일로 가입
      </Button>

      <div className="pt-1 text-center text-sm">
        <span className="text-brand-gray-300">이미 계정이 있으신가요? </span>
        <Link
          href="/auth/login"
          className="text-brand-login-text font-bold underline underline-offset-2"
        >
          로그인
        </Link>
      </div>
    </div>
  )
}
