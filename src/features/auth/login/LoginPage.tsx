'use client'

import { useState } from 'react'
import Link from 'next/link'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'

import KakaoIcon from '@/features/auth/login/assets/kakao-icon.svg'
import GoogleIcon from '@/features/auth/login/assets/google-icon.svg'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const isDisabled = !email || !password || !!emailError || !!passwordError

  const handleEmailChange = (value: string) => {
    setEmail(value)

    if (!value) {
      setEmailError('')
      return
    }

    if (!emailRegex.test(value)) {
      setEmailError('이메일 형식에 맞춰 작성해주세요.')
      return
    }

    setEmailError('')
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)

    if (!value) {
      setPasswordError('비밀번호를 입력해주세요.')
      return
    }

    setPasswordError('')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let hasError = false

    if (!email) {
      setEmailError('이메일을 입력해주세요.')
      hasError = true
    } else if (!emailRegex.test(email)) {
      setEmailError('이메일 형식에 맞춰 작성해주세요.')
      hasError = true
    }

    if (!password) {
      setPasswordError('비밀번호를 입력해주세요.')
      hasError = true
    }

    if (hasError) return

    // TODO: API 연결되면 여기서 로그인 요청
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
            className="bg-brand-kakao text-brand-login-text w-full cursor-pointer hover:opacity-90"
          >
            <KakaoIcon className="mr-2 size-4 shrink-0 -translate-y-px overflow-visible" />
            카카오로 시작하기
          </Button>

          <Button
            type="button"
            size="reg"
            variant="outline"
            className="hover:bg-brand-gray-100 hover:border-brand-gray-400 w-full cursor-pointer"
          >
            <GoogleIcon className="mr-2 size-5 shrink-0 overflow-visible" />
            구글로 시작하기
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="text-brand-gray-500 text-sm">
              이메일
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              size="sm"
              placeholder="이메일을 입력해주세요."
              autoComplete="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
            />
            {emailError && (
              <p className="text-brand-error text-sm">{emailError}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-brand-gray-500 text-sm">
              비밀번호
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              size="sm"
              placeholder="비밀번호를 입력해주세요."
              autoComplete="current-password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            {passwordError && (
              <p className="text-brand-error text-sm">{passwordError}</p>
            )}
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

          <Button
            type="submit"
            size="reg"
            variant="secondary"
            disabled={isDisabled}
            className="w-full cursor-pointer font-normal hover:opacity-90"
          >
            이메일로 로그인
          </Button>
        </form>

        <div className="mt-6 space-y-2 text-center text-sm">
          <div className="text-brand-gray-300 flex flex-wrap items-center justify-center gap-2">
            <span>이메일 or 비밀번호가 생각 안나세요?</span>
            <Link
              href="/find-email"
              className="text-brand-login-text font-bold underline underline-offset-2"
            >
              이메일 찾기
            </Link>
            <span className="text-brand-gray-300">|</span>
            <Link
              href="/reset-password"
              className="text-brand-login-text font-bold underline underline-offset-2"
            >
              비밀번호 재설정
            </Link>
          </div>

          <div className="text-brand-gray-300">
            <span>아직 회원가입을 안하셨나요? </span>
            <Link
              href="/signup"
              className="text-brand-login-text font-bold underline underline-offset-2"
            >
              회원가입
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
