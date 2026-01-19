'use client'

import Link from 'next/link'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'

const LoginPage = () => {
  return (
    <main className="bg-brand-white flex min-h-dvh items-center justify-center px-4">
      <section className="w-full max-w-md">
        <header className="text-center">
          <h1 className="text-brand-black text-3xl font-bold">StudiGo</h1>
          <p className="text-brand-black mt-2 text-base">로그인</p>
        </header>

        <div className="mt-8 space-y-3">
          <Button
            type="button"
            className="text-brand-black w-full bg-yellow-400 hover:bg-yellow-400/90"
          >
            카카오로 시작하기
          </Button>

          <Button type="button" variant="outline" className="w-full">
            구글로 시작하기
          </Button>
        </div>

        <form className="mt-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-brand-gray-500 text-sm">
              이메일
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요."
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-brand-gray-500 text-sm">
              비밀번호
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="영문, 숫자, 또는 특수문자 조합 8글자 이상"
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              className="border-brand-gray-300 h-4 w-4 rounded"
            />
            <label htmlFor="remember" className="text-brand-gray-500 text-sm">
              이메일 저장
            </label>
          </div>

          <Button type="submit" variant="secondary" className="w-full">
            이메일로 로그인
          </Button>
        </form>

        <div className="text-brand-gray-500 mt-6 space-y-2 text-center text-sm">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>이메일 or 비밀번호가 생각 안나세요?</span>
            <Link
              href="/find-email"
              className="text-brand-black underline underline-offset-2"
            >
              이메일 찾기
            </Link>
            <span className="text-brand-gray-300">|</span>
            <Link
              href="/reset-password"
              className="text-brand-black underline underline-offset-2"
            >
              비밀번호 재설정
            </Link>
          </div>

          <div>
            <span>아직 회원가입을 안하셨나요? </span>
            <Link href="/signup" className="text-brand-black font-medium">
              회원가입
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
