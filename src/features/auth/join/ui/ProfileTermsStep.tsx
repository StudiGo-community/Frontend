'use client'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'
import type { AgreeKey, JoinFormState } from './JoinFunnel'

export function ProfileTermsStep(props: {
  value: JoinFormState
  onChange: (patch: Partial<JoinFormState>) => void
  onToggleAgree: (k: AgreeKey, v: boolean) => void
}) {
  const v = props.value

  return (
    <div className="space-y-5">
      <Field label="이름">
        <Input
          size="sm"
          placeholder="이름을 입력해주세요."
          value={v.name}
          onChange={(e) => props.onChange({ name: e.target.value })}
        />
      </Field>

      <Field label="전화번호">
        <div className="flex gap-2">
          <Input
            size="sm"
            placeholder="'-'을 빼고 입력해주세요."
            value={v.phone}
            onChange={(e) => props.onChange({ phone: e.target.value })}
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
          checked={v.agree.all}
          onChange={(c) => props.onToggleAgree('all', c)}
        />
        <div className="bg-brand-gray-200 my-3 h-px w-full" />
        <CheckRow
          label="(필수) 서비스 이용을 위한 필수 동의사항"
          checked={v.agree.terms}
          onChange={(c) => props.onToggleAgree('terms', c)}
        />
        <CheckRow
          label="(선택) 마케팅 정보 수신 동의"
          checked={v.agree.marketing}
          onChange={(c) => props.onToggleAgree('marketing', c)}
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
