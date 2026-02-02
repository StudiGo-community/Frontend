'use client'

import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'
import type { JoinFormState } from '@/features/auth-join/ui/JoinFunnel'
import {
  checkEmail,
  sendEmailCode,
  verifyEmailCode,
} from '@/features/auth-join/api/email-auth-api'

type ApiErrorBody = {
  detail?: string
  error_detail?: string
  error_code?: string
  retry_after?: number
}

function getErrorMessage(error: unknown, fallback: string) {
  if (!isAxiosError<ApiErrorBody>(error)) return fallback
  return (
    error.response?.data?.detail ??
    error.response?.data?.error_detail ??
    fallback
  )
}

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

interface EmailPasswordStepProps {
  value: JoinFormState
  onChange: (patch: Partial<JoinFormState>) => void
}

export function EmailPasswordStep({ value, onChange }: EmailPasswordStepProps) {
  const PASSWORD_RULE_TEXT =
    '영문/숫자/특수문자 조합 8자 이상으로 입력해 주세요.'

  const [emailCheckError, setEmailCheckError] = useState<string | null>(null)

  const isEmailFormatValid =
    value.email.length === 0 || EMAIL_REGEX.test(value.email)

  const isCodeSent = useMemo(
    () => Boolean(value.emailRequestId),
    [value.emailRequestId]
  )

  const isConfirmTouched = value.passwordConfirm.length > 0
  const isPasswordMismatch =
    isConfirmTouched && value.password !== value.passwordConfirm
  const isPasswordMatch =
    isConfirmTouched && value.password === value.passwordConfirm

  const checkEmailMut = useMutation({
    mutationFn: () => checkEmail(value.email),
    onSuccess: (data) => {
      onChange({ emailCheckToken: data.check_token })
      setEmailCheckError(null)
      toast.success(data.message || '사용 가능한 이메일입니다.')
    },
    onError: (e: unknown) => {
      onChange({ emailCheckToken: '' })

      const msg = getErrorMessage(e, '이미 가입된 이메일입니다.')
      setEmailCheckError(msg)
      toast.error(msg)
    },
  })

  const sendCodeMut = useMutation({
    mutationFn: () =>
      sendEmailCode({
        email: value.email,
        check_token: value.emailCheckToken,
      }),
    onSuccess: (data) => {
      onChange({
        emailRequestId: data.request_id,
        emailCode: '',
        emailVerified: false,
        emailVerifyToken: '',
      })
      toast.success('인증코드를 발송했어요.')
    },
    onError: (e: unknown) =>
      toast.error(getErrorMessage(e, '인증코드 발송 실패')),
  })

  const verifyCodeMut = useMutation({
    mutationFn: () =>
      verifyEmailCode({
        email: value.email,
        request_id: value.emailRequestId,
        verification_code: value.emailCode,
      }),
    onSuccess: (data) => {
      onChange({
        emailVerified: true,
        emailVerifyToken: data.email_verify_token,
      })
      toast.success('이메일 인증 완료')
    },
    onError: (e: unknown) =>
      toast.error(getErrorMessage(e, '인증코드 확인 실패')),
  })

  const canCheckEmail =
    Boolean(value.email) && isEmailFormatValid && !checkEmailMut.isPending

  const canSendCode =
    Boolean(value.email) &&
    Boolean(value.emailCheckToken) &&
    !sendCodeMut.isPending

  const canVerify =
    Boolean(value.email) &&
    Boolean(value.emailCode) &&
    Boolean(value.emailRequestId) &&
    !verifyCodeMut.isPending

  const authButtonLabel = value.emailVerified
    ? '인증완료'
    : isCodeSent
      ? '확인'
      : '인증코드 발송'

  const onClickAuthButton = () => {
    if (value.emailVerified) return
    if (!isCodeSent) {
      sendCodeMut.mutate()
      return
    }
    verifyCodeMut.mutate()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm">이메일</label>
        <div className="flex gap-2">
          <Input
            value={value.email}
            onChange={(e) => {
              setEmailCheckError(null)

              onChange({
                email: e.target.value,

                emailCheckToken: '',
                emailRequestId: '',
                emailCode: '',
                emailVerified: false,
                emailVerifyToken: '',
              })
            }}
            placeholder="example@email.com"
          />
          <Button
            type="button"
            variant="outline"
            disabled={!canCheckEmail}
            onClick={() => checkEmailMut.mutate()}
          >
            중복확인
          </Button>
        </div>

        {value.email.length > 0 && !isEmailFormatValid && (
          <p className="text-brand-error text-xs">
            올바른 이메일 형식으로 입력해 주세요.
          </p>
        )}

        {value.emailCheckToken && !emailCheckError && isEmailFormatValid && (
          <p className="text-brand-green text-xs">사용 가능한 이메일입니다.</p>
        )}

        {emailCheckError && (
          <p className="text-brand-error text-xs">{emailCheckError}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm">이메일 인증</label>
        <div className="flex gap-2">
          <Input
            value={value.emailCode}
            onChange={(e) => onChange({ emailCode: e.target.value })}
            placeholder="인증코드 입력"
            disabled={!isCodeSent || value.emailVerified}
          />

          <Button
            type="button"
            variant="outline"
            disabled={
              value.emailVerified
                ? true
                : isCodeSent
                  ? !canVerify
                  : !canSendCode
            }
            onClick={onClickAuthButton}
          >
            {authButtonLabel}
          </Button>
        </div>

        {value.emailVerified && (
          <p className="text-brand-green text-xs">인증 완료</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm">비밀번호</label>
        <Input
          type="password"
          value={value.password}
          onChange={(e) => onChange({ password: e.target.value })}
        />

        <p className="text-brand-gray-400 text-xs">{PASSWORD_RULE_TEXT}</p>

        {isPasswordMismatch && (
          <p className="text-brand-error text-xs">
            비밀번호가 일치하지 않아요.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm">비밀번호 확인</label>
        <Input
          type="password"
          value={value.passwordConfirm}
          onChange={(e) => onChange({ passwordConfirm: e.target.value })}
          className={
            isPasswordMismatch
              ? 'border-brand-error focus-visible:ring-brand-error'
              : undefined
          }
        />

        {isPasswordMismatch && (
          <p className="text-brand-error text-xs">
            비밀번호가 일치하지 않아요.
          </p>
        )}
        {isPasswordMatch && (
          <p className="text-brand-green text-xs">비밀번호가 일치해요.</p>
        )}
      </div>
    </div>
  )
}
