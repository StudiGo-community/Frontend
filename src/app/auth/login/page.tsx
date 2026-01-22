'use client'

import Link from 'next/link'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'
import { toast } from 'sonner'

import KakaoIcon from '@/features/auth/assets/kakao-icon.svg'
import GoogleIcon from '@/features/auth/assets/google-icon.svg'

import { EmailLoginRequestSchema } from '@/shared/api/schemas/auth'

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('이메일 형식에 맞춰 작성해주세요.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
  remember: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginFormSchema>

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  })

  const handleKakaoStart = useCallback(() => {
    window.location.assign('/auth/social/kakao?code=MOCK_KAKAO_CODE')
  }, [])

  const onSubmit = useCallback((values: LoginFormValues) => {
    const result = EmailLoginRequestSchema.safeParse({
      email: values.email,
      password: values.password,
      remember_me: values.remember ?? false,
    })

    if (!result.success) {
      toast.error('입력값을 확인해주세요.')
      return
    }

    // TODO: API 호출
    toast.success('로그인 요청을 보냈어요.')
  }, [])

  const isDisabled = !isValid || isSubmitting

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

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="text-brand-gray-500 text-sm">
              이메일
            </label>
            <Input
              id="email"
              type="email"
              size="sm"
              placeholder="이메일을 입력해주세요."
              autoComplete="email"
              {...register('email')}
            />
            {errors.email?.message && (
              <p className="text-brand-error text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-brand-gray-500 text-sm">
              비밀번호
            </label>
            <Input
              id="password"
              type="password"
              size="sm"
              placeholder="비밀번호를 입력해주세요."
              autoComplete="current-password"
              {...register('password')}
            />
            {errors.password?.message && (
              <p className="text-brand-error text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              className="border-brand-gray-300 h-4 w-4 rounded"
              {...register('remember')}
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
            className={`w-full font-normal hover:opacity-90 ${
              !isDisabled ? 'cursor-pointer' : ''
            }`}
          >
            이메일로 로그인
          </Button>
        </form>

        <div className="mt-6 space-y-2 text-center text-sm">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-brand-gray-300">
              이메일 or 비밀번호가 생각 안나세요?
            </span>
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

          <div>
            <span className="text-brand-gray-300">
              아직 회원가입을 안하셨나요?
            </span>
            <Link
              href="/auth/join"
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
