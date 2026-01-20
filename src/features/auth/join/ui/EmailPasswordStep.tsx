'use client'

import * as React from 'react'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'
import type { JoinFormState } from '@/features/auth/join/ui/JoinFunnel'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LETTER_REGEX = /[A-Za-z]/
const NUMBER_REGEX = /[0-9]/
const SPECIAL_REGEX = /[^A-Za-z0-9]/

function isValidEmail(email: string) {
  return EMAIL_REGEX.test(email)
}

function passwordChecks(password: string) {
  return {
    min8: password.length >= 8,
    combo:
      LETTER_REGEX.test(password) &&
      NUMBER_REGEX.test(password) &&
      SPECIAL_REGEX.test(password),
  }
}

export function EmailPasswordStep(props: {
  value: JoinFormState
  onChange: (patch: Partial<JoinFormState>) => void
}) {
  const formValue = props.value

  const emailTouched = formValue.email.length > 0
  const emailOk = isValidEmail(formValue.email)

  const password = formValue.password
  const passwordTouched = password.length > 0
  const passwordRule = passwordChecks(password)

  const passwordRuleClass = (ok: boolean) => {
    if (!passwordTouched) return 'text-brand-gray-300'
    return ok ? '!text-brand-green' : '!text-brand-error'
  }

  const passwordConfirmTouched = formValue.passwordConfirm.length > 0
  const passwordConfirmOk =
    formValue.passwordConfirm.length > 0 &&
    formValue.passwordConfirm === formValue.password

  return (
    <div className="space-y-5">
      <Field label="이메일">
        <div className="flex gap-2">
          <Input
            type="email"
            size="sm"
            placeholder="이메일을 입력해주세요."
            value={formValue.email}
            onChange={(e) => props.onChange({ email: e.target.value })}
            autoComplete="email"
          />
          <Button
            type="button"
            size="reg"
            variant="secondary"
            className="h-12 w-24"
          >
            인증
          </Button>
        </div>

        {emailTouched && !emailOk && (
          <p className="text-brand-error mt-1 text-sm">
            이메일 형식에 맞춰 작성해주세요.
          </p>
        )}
      </Field>

      <Field label="비밀번호">
        <Input
          type="password"
          size="sm"
          placeholder="비밀번호를 입력해주세요."
          value={formValue.password}
          onChange={(e) => props.onChange({ password: e.target.value })}
          autoComplete="new-password"
        />

        <ul className="mt-2 space-y-1 text-xs">
          <li className={passwordRuleClass(passwordRule.min8)}>✓ 최소 8글자</li>
          <li className={passwordRuleClass(passwordRule.combo)}>
            ✓ 영문, 숫자, 특수문자 조합
          </li>
        </ul>
      </Field>

      <Field label="비밀번호 확인">
        <Input
          type="password"
          size="sm"
          placeholder="비밀번호를 한 번 더 입력해주세요."
          value={formValue.passwordConfirm}
          onChange={(e) => props.onChange({ passwordConfirm: e.target.value })}
          autoComplete="new-password"
        />

        {passwordConfirmTouched && !passwordConfirmOk && (
          <p className="text-brand-error mt-1 text-sm">
            비밀번호가 일치하지 않습니다.
          </p>
        )}
        {passwordConfirmOk && (
          <p className="text-brand-green mt-1 text-sm">
            비밀번호가 일치합니다.
          </p>
        )}
      </Field>
    </div>
  )
}

function Field(props: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-brand-gray-500 text-sm">{props.label}</label>
      {props.children}
    </div>
  )
}
