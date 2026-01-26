'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'

import { useLoginMutation } from '../hooks/useLoginMutation'

const SAVED_EMAIL_KEY = 'studigo.saved_login_email'

const loginFormSchema = z
  .object({
    email: z
      .string()
      .min(1, '이메일을 입력해주세요.')
      .email('이메일 형식에 맞춰 작성해주세요.'),
    password: z
      .string()
      .min(1, '비밀번호를 입력해주세요.')
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .max(20, '비밀번호는 20자 이하이어야 합니다.')
      .regex(
        /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
        '영문 소문자, 숫자, 특수문자(!@#$%^&*)를 모두 포함해야 합니다.'
      ),
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

  useEffect(() => {
    const raw = localStorage.getItem(SAVED_EMAIL_KEY)
    if (!raw) return
    try {
      const parsed: { email: string; remember: boolean } = JSON.parse(raw)
      if (parsed.remember) {
        setValue('email', parsed.email, { shouldValidate: true })
        setValue('remember', true)
      }
    } catch {
      localStorage.removeItem(SAVED_EMAIL_KEY)
    }
  }, [setValue])

  const remember = useWatch({ control, name: 'remember' })
  const email = useWatch({ control, name: 'email' })

  useEffect(() => {
    if (remember && email) {
      localStorage.setItem(
        SAVED_EMAIL_KEY,
        JSON.stringify({ email, remember: true })
      )
    } else if (!remember) {
      localStorage.removeItem(SAVED_EMAIL_KEY)
    }
  }, [remember, email])

  const loginMutation = useLoginMutation()

  function onSubmit(values: LoginFormValues) {
    loginMutation.mutate({
      email: values.email,
      password: values.password,
      remember_me: values.remember ?? false,
    })
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
        </div>
      </div>
    </>
  )
}
