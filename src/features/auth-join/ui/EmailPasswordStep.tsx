'use client'

import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'
import type { JoinFormState } from '@/features/auth-join/ui/JoinFunnel'
import {
  useCheckEmailMutation,
  useSendEmailCodeMutation,
  useVerifyEmailCodeMutation,
} from '@/features/auth-join/api/use-email-auth-mutations'

interface ApiErrorBody {
  detail?: string
  error_detail?: string
  error_code?: string
  retry_after?: number
}

const getErrorMessage = (error: unknown, fallback: string) => {
  if (!isAxiosError<ApiErrorBody>(error)) return fallback
  return (
    error.response?.data?.detail ??
    error.response?.data?.error_detail ??
    fallback
  )
}

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

export interface EmailPasswordStepProps {
  value: JoinFormState
  onChange: (patch: Partial<JoinFormState>) => void
}

export const EmailPasswordStep = ({
  value,
  onChange,
}: EmailPasswordStepProps) => {
  const passwordRuleText = '영문/숫자/특수문자 조합 8자 이상으로 입력해 주세요.'
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

  const checkEmailMutation = useCheckEmailMutation(value.email)
  const sendEmailCodeMutation = useSendEmailCodeMutation()
  const verifyEmailCodeMutation = useVerifyEmailCodeMutation()

  const canCheckEmail =
    Boolean(value.email) && isEmailFormatValid && !checkEmailMutation.isPending

  const canSendCode =
    Boolean(value.email) &&
    Boolean(value.emailCheckToken) &&
    !sendEmailCodeMutation.isPending

  const canVerify =
    Boolean(value.email) &&
    Boolean(value.emailCode) &&
    Boolean(value.emailRequestId) &&
    !verifyEmailCodeMutation.isPending

  const authButtonLabel = value.emailVerified
    ? '인증완료'
    : isCodeSent
      ? '확인'
      : '인증코드 발송'

  const onClickAuthButton = async () => {
    if (value.emailVerified) return

    if (!isCodeSent) {
      try {
        const data = await sendEmailCodeMutation.mutateAsync({
          email: value.email,
          check_token: value.emailCheckToken,
        })

        onChange({
          emailRequestId: data.request_id,
          emailCode: '',
          emailVerified: false,
          emailVerifyToken: '',
        })
        toast.success('인증코드를 발송했어요.')
      } catch (error: unknown) {
        toast.error(getErrorMessage(error, '인증코드 발송 실패'))
      }
      return
    }

    try {
      const data = await verifyEmailCodeMutation.mutateAsync({
        email: value.email,
        request_id: value.emailRequestId,
        verification_code: value.emailCode,
      })

      onChange({
        emailVerified: true,
        emailVerifyToken: data.email_verify_token,
      })
      toast.success('이메일 인증 완료')
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, '인증코드 확인 실패'))
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm">이메일</label>

        <div className="flex gap-2">
          <Input
            value={value.email}
            onChange={(event) => {
              setEmailCheckError(null)
              onChange({
                email: event.target.value,
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
            onClick={async () => {
              try {
                const data = await checkEmailMutation.mutateAsync()
                onChange({ emailCheckToken: data.check_token })
                setEmailCheckError(null)
                toast.success(data.message || '사용 가능한 이메일입니다.')
              } catch (error: unknown) {
                onChange({ emailCheckToken: '' })
                const message = getErrorMessage(
                  error,
                  '이미 가입된 이메일입니다.'
                )
                setEmailCheckError(message)
                toast.error(message)
              }
            }}
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
            onChange={(event) => onChange({ emailCode: event.target.value })}
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
          onChange={(event) => onChange({ password: event.target.value })}
        />
        <p className="text-brand-gray-400 text-xs">{passwordRuleText}</p>

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
          onChange={(event) =>
            onChange({ passwordConfirm: event.target.value })
          }
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
