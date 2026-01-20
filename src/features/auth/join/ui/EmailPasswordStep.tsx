'use client'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'
import type { JoinFormState } from './JoinFunnel'

export function EmailPasswordStep(props: {
  value: JoinFormState
  onChange: (patch: Partial<JoinFormState>) => void
}) {
  const v = props.value

  return (
    <div className="space-y-5">
      <Field label="이메일">
        <div className="flex gap-2">
          <Input
            type="email"
            size="sm"
            placeholder="이메일을 입력해주세요."
            value={v.email}
            onChange={(e) => props.onChange({ email: e.target.value })}
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

      <Field label="비밀번호">
        <Input
          type="password"
          size="sm"
          placeholder="비밀번호를 입력해주세요."
          value={v.password}
          onChange={(e) => props.onChange({ password: e.target.value })}
        />
        <ul className="text-brand-gray-300 mt-2 space-y-1 text-xs">
          <li>✓ 최소 8글자</li>
          <li>✓ 영문, 숫자, 특수문자 조합 (!@#$%^&*)</li>
        </ul>
      </Field>

      <Field label="비밀번호 확인">
        <Input
          type="password"
          size="sm"
          placeholder="비밀번호를 한 번 더 입력해주세요."
          value={v.passwordConfirm}
          onChange={(e) => props.onChange({ passwordConfirm: e.target.value })}
        />
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
