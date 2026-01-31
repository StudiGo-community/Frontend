'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { useEffect } from 'react'

import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'

import { useLoginMutation } from '../hooks/useLoginMutation'
import { applyLoginSession } from '@/entities/session/lib/apply-login-session'
import type { SessionUser } from '@/entities/session/model/types'

const SAVED_EMAIL_KEY = 'studigo.saved_login_email'

const passwordRule = z
  .string()
  .min(1, '비밀번호를 입력해주세요.')
  .min(8, '비밀번호는 8자 이상이어야 합니다.')
  .max(20, '비밀번호는 20자 이하여야 합니다.')
  .regex(/[0-9]/, '숫자를 포함해야 합니다.')
  .regex(/[^A-Za-z0-9]/, '특수문자를 포함해야 합니다.')

const loginFormSchema = z
  .object({
    email: z
      .string()
      .min(1, '이메일을 입력해주세요.')
      .email('이메일 형식에 맞춰 작성해주세요.'),
    password: passwordRule,
    remember: z.boolean().optional(),
  })
  .superRefine(({ password, email }, ctx) => {
    if (password === email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '이메일과 동일한 비밀번호는 사용할 수 없습니다.',
        path: ['password'],
      })
    }

    for (let i = 0; i < password.length - 2; i++) {
      const char1 = password.charCodeAt(i)
      const char2 = password.charCodeAt(i + 1)
      const char3 = password.charCodeAt(i + 2)

      if (
        (char1 + 1 === char2 && char2 + 1 === char3) ||
        (char1 - 1 === char2 && char2 - 1 === char3)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '연속된 문자나 숫자를 3자 이상 사용할 수 없습니다.',
          path: ['password'],
        })
        break
      }
    }
  })

type LoginFormValues = z.infer<typeof loginFormSchema>

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next')

  const {
    register,
    handleSubmit,
    setValue,
    control,
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

  const remember = useWatch({ control, name: 'remember' })
  const email = useWatch({ control, name: 'email' })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const raw = localStorage.getItem(SAVED_EMAIL_KEY)
    if (!raw) return

    try {
      const parsed = JSON.parse(raw) as { email: string; remember: boolean }
      if (parsed.remember && parsed.email) {
        setValue('email', parsed.email, { shouldValidate: true })
        setValue('remember', true)
      }
    } catch {
      localStorage.removeItem(SAVED_EMAIL_KEY)
    }
  }, [setValue])

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (remember && email) {
      localStorage.setItem(
        SAVED_EMAIL_KEY,
        JSON.stringify({ email, remember: true })
      )
    } else {
      localStorage.removeItem(SAVED_EMAIL_KEY)
    }
  }, [remember, email])

  const onErrorCallback = (error: AxiosError) => {
    if (error.message === 'LOGIN_ERROR_400') {
      toast.error('이메일과 비밀번호를 확인해주세요.')
      return true
    }
    if (error.message === 'LOGIN_ERROR_403') {
      toast.error('탈퇴한 계정입니다')
      return true
    }
    if (error.message === 'LOGIN_ERROR_429') {
      toast.error('로그인 시도 횟수를 초과했습니다')
      return true
    }
    return false
  }

  const { mutateAsync } = useLoginMutation({
    onError: (error: AxiosError) => {
      onErrorCallback(error)
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    const response = await mutateAsync({
      email: values.email,
      password: values.password,
      remember_me: values.remember ?? false,
    })

    if (!response.accessToken || !response.user) {
      toast.error('로그인에 실패했어요. 잠시 후 다시 시도해주세요.')
      return
    }

    const sessionUser: SessionUser = {
      id: response.user.id,
      email: response.user.email,
      nickname: response.user.nickname,
      name: response.user.name,
      role: response.user.role,
      status: response.user.status,
      provider: response.user.provider,
      profileImageUrl: response.user.profileImageUrl ?? null,
    }

    applyLoginSession({
      accessToken: response.accessToken,
      user: sessionUser,
    })

    toast.success(`${response.user.nickname}님, 환영합니다!`)
    const redirectPath = next ? decodeURIComponent(next) : '/'
    router.replace(redirectPath)
    router.refresh()
  }

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
            className={errors.email ? 'border-brand-error' : ''}
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
            className={errors.password ? 'border-brand-error' : ''}
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
            className="border-brand-gray-300 h-4 w-4 cursor-pointer rounded"
            {...register('remember')}
          />
          <label
            htmlFor="remember"
            className="text-brand-gray-500 cursor-pointer text-sm select-none"
          >
            이메일 저장
          </label>
        </div>

        <Button
          type="submit"
          size="reg"
          variant="secondary"
          disabled={isDisabled}
          className={`w-full font-normal hover:opacity-90 ${
            !isDisabled ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
        >
          {isSubmitting ? '로그인 중...' : '이메일로 로그인'}
        </Button>
      </form>

      <div className="mt-6 space-y-2 text-center text-sm">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-brand-gray-300">
            이메일 or 비밀번호가 생각 안나세요?
          </span>
          <Link href="/find-email" className="font-bold underline">
            이메일 찾기
          </Link>
          <span className="text-brand-gray-300">|</span>
          <Link href="/reset-password" className="font-bold underline">
            비밀번호 재설정
          </Link>
          <span className="text-brand-gray-300">|</span>
          <span className="text-brand-gray-300 text-sm">
            아직 회원가입을 안하셨나요?
          </span>
          <Link
            href="/auth/join"
            className="text-center text-sm font-bold underline"
          >
            회원가입
          </Link>
        </div>
      </div>
    </>
  )
}
