'use client'

import * as React from 'react'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'
import type {
  AgreeKey,
  JoinFormState,
} from '@/features/auth/join/ui/JoinFunnel'

function formatKoreanPhoneNumber(input: string) {
  const digits = input.replace(/\D/g, '').slice(0, 11)

  const first = digits.slice(0, 3)
  const middle = digits.slice(3, 7)
  const last = digits.slice(7, 11)

  if (digits.length <= 3) return first
  if (digits.length <= 7) return `${first}-${digits.slice(3)}`
  return `${first}-${middle}-${last}`
}

export function ProfileTermsStep(props: {
  value: JoinFormState
  onChange: (patch: Partial<JoinFormState>) => void
  onToggleAgree: (k: AgreeKey, v: boolean) => void
}) {
  const formValue = props.value

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = formatKoreanPhoneNumber(e.target.value)
    props.onChange({ phone: next })
  }

  return (
    <div className="space-y-5">
      <Field label="이름">
        <Input
          size="sm"
          placeholder="이름을 입력해주세요."
          value={formValue.name}
          onChange={(e) => props.onChange({ name: e.target.value })}
        />
      </Field>

      <Field label="전화번호">
        <div className="flex gap-2">
          <Input
            size="sm"
            placeholder="010-0000-0000"
            value={formValue.phone}
            onChange={onPhoneChange}
            inputMode="numeric"
            autoComplete="tel"
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
      </Field>

      <div className="pt-2">
        <CheckRow
          label="전체 동의"
          checked={formValue.agree.all}
          onChange={(checked) => props.onToggleAgree('all', checked)}
        />
        <div className="bg-brand-gray-200 my-3 h-px w-full" />
        <CheckRow
          label="(필수) 서비스 이용을 위한 필수 동의사항"
          checked={formValue.agree.terms}
          onChange={(checked) => props.onToggleAgree('terms', checked)}
        />
        <CheckRow
          label="(선택) 마케팅 정보 수신 동의"
          checked={formValue.agree.marketing}
          onChange={(checked) => props.onToggleAgree('marketing', checked)}
        />
      </div>
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

function CheckRow(props: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1 text-sm">
      <input
        type="checkbox"
        className="border-brand-gray-300 h-4 w-4 rounded"
        checked={props.checked}
        onChange={(e) => props.onChange(e.target.checked)}
      />
      <span className="text-brand-gray-500">{props.label}</span>
    </label>
  )
}
