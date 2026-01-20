'use client'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'
import type { JoinFormState } from './JoinFunnel'

export function ExtraInfoStep(props: {
  value: JoinFormState
  onChange: (patch: Partial<JoinFormState>) => void
}) {
  const v = props.value

  return (
    <div className="space-y-5">
      <Field label="닉네임">
        <div className="flex gap-2">
          <Input
            size="sm"
            placeholder="닉네임을 입력해주세요."
            value={v.nickname}
            onChange={(e) => props.onChange({ nickname: e.target.value })}
          />
          <Button
            type="button"
            size="reg"
            variant="secondary"
            className="h-12 w-28"
          >
            중복 확인
          </Button>
        </div>

        <ul className="text-brand-gray-300 mt-2 space-y-1 text-xs">
          <li>✓ 최소 2글자, 최대 12글자</li>
          <li>✓ 한글, 영문, 숫자만 사용 가능(특수문자, 공백 불가)</li>
          <li>✓ 금지어 포함 불가</li>
        </ul>
      </Field>

      <Field label="생년월일">
        <Input
          size="sm"
          placeholder="생년월일을 선택해주세요."
          value={v.birth}
          onChange={(e) => props.onChange({ birth: e.target.value })}
        />
      </Field>

      <Field label="성별">
        <Input
          size="sm"
          placeholder="성별을 입력해주세요."
          value={v.gender}
          onChange={(e) => props.onChange({ gender: e.target.value })}
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
