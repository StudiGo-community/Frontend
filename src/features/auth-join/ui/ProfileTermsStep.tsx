'use client'

import type { ChangeEvent, ReactNode } from 'react'
import { Input } from '@/shared/ui/input'
import type {
  AgreeKey,
  JoinFormState,
} from '@/features/auth-join/ui/JoinFunnel'

const formatKoreanPhoneNumber = (input: string) => {
  const digits = input.replace(/\D/g, '').slice(0, 11)

  const first = digits.slice(0, 3)
  const middle = digits.slice(3, 7)
  const last = digits.slice(7, 11)

  if (digits.length <= 3) return first
  if (digits.length <= 7) return `${first}-${digits.slice(3)}`
  return `${first}-${middle}-${last}`
}

export interface ProfileTermsStepProps {
  value: JoinFormState
  onChange: (patch: Partial<JoinFormState>) => void
  onToggleAgree: (key: AgreeKey, value: boolean) => void
}

export const ProfileTermsStep = ({
  value,
  onChange,
  onToggleAgree,
}: ProfileTermsStepProps) => {
  const onPhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = formatKoreanPhoneNumber(event.target.value)
    onChange({ phone: nextValue })
  }

  return (
    <div className="space-y-5">
      <Field label="이름">
        <Input
          size="sm"
          placeholder="이름을 입력해주세요."
          value={value.name}
          onChange={(event) => onChange({ name: event.target.value })}
        />
      </Field>

      <Field label="전화번호">
        <Input
          size="sm"
          placeholder="010-0000-0000"
          value={value.phone}
          onChange={onPhoneChange}
          inputMode="numeric"
          autoComplete="tel"
        />
      </Field>

      <div className="pt-2">
        <CheckRow
          label="전체 동의"
          checked={value.agree.all}
          onChange={(checked) => onToggleAgree('all', checked)}
        />
        <div className="bg-brand-gray-200 my-3 h-px w-full" />
        <CheckRow
          label="(필수) 서비스 이용을 위한 필수 동의사항"
          checked={value.agree.terms}
          onChange={(checked) => onToggleAgree('terms', checked)}
        />
        <CheckRow
          label="(필수) 개인정보 처리방침 동의"
          checked={value.agree.privacy}
          onChange={(checked) => onToggleAgree('privacy', checked)}
        />
        <CheckRow
          label="(선택) 마케팅 정보 수신 동의"
          checked={value.agree.marketing}
          onChange={(checked) => onToggleAgree('marketing', checked)}
        />
      </div>
    </div>
  )
}

interface FieldProps {
  label: string
  children: ReactNode
}

const Field = ({ label, children }: FieldProps) => {
  return (
    <div className="space-y-1">
      <label className="text-brand-gray-500 text-sm">{label}</label>
      {children}
    </div>
  )
}

interface CheckRowProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const CheckRow = ({ label, checked, onChange }: CheckRowProps) => {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1 text-sm">
      <input
        type="checkbox"
        className="border-brand-gray-300 h-4 w-4 rounded"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="text-brand-gray-500">{label}</span>
    </label>
  )
}
