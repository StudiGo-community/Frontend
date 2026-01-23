'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'
import { EmailLoginRequestSchema } from '@/features/auth/api/schemas/login'

const ErrorResponseSchema = z.object({
  error_code: z.string(),
  error_detail: z.string(),
  retry_after: z.number().optional(),
})
type ErrorResponse = z.infer<typeof ErrorResponseSchema>

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('이메일 형식에 맞춰 작성해주세요.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
  remember: z.boolean().optional(),
})
type LoginFormValues = z.infer<typeof loginFormSchema>

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next')

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

  const onSubmit = useCallback(
    async (values: LoginFormValues) => {
      const request = EmailLoginRequestSchema.safeParse({
        email: values.email,
        password: values.password,
        remember_me: values.remember ?? false,
      })

      if (!request.success) {
        toast.error('입력값을 확인해주세요.')
        return
      }

      try {
        const res = await fetch('/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(request.data),
        })

        const json: unknown = await res.json().catch(() => null)

        if (!res.ok) {
          const parsed = ErrorResponseSchema.safeParse(json)

          if (!parsed.success) {
            toast.error('로그인에 실패했습니다.')
            return
          }

          const err: ErrorResponse = parsed.data

          if (err.error_code === 'INVALID_CREDENTIALS') {
            toast.error('이메일 또는 비밀번호를 확인해주세요.')
            return
          }

          if (err.error_code === 'ACCOUNT_WITHDRAWN') {
            toast.error('탈퇴한 계정입니다.')
            return
          }

          if (err.error_code === 'ACCOUNT_BANNED') {
            toast.error('이용이 제한된 계정입니다.')
            return
          }

          if (err.error_code === 'LOGIN_BLOCKED') {
            toast.error(
              err.error_detail ??
                '로그인 시도 횟수를 초과했습니다. 잠시 후 다시 시도해주세요.'
            )
            return
          }

          toast.error(err.error_detail ?? '로그인에 실패했습니다.')
          return
        }

        // TODO: access token 메모리 저장 (토큰 인프라 이슈에서 처리)

        toast.success('로그인에 성공했어요.')
        router.replace(next ? decodeURIComponent(next) : '/')
      } catch {
        toast.error('네트워크 오류가 발생했어요. 잠시 후 다시 시도해주세요.')
      }
    },
    [router, next]
  )

  const isDisabled = !isValid || isSubmitting

  return (
    <>
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
    </>
  )
}
