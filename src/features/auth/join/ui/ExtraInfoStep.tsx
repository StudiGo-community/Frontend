'use client'

import type { ChangeEvent, ReactNode } from 'react'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'
import { Dropdown } from '@/shared/ui/dropdown/Dropdown'
import type { JoinFormState } from '@/features/auth/join/ui/JoinFunnel'

const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9]+$/

const BANNED_WORDS = [
  '씨발',
  '개새끼',
  '관리자',
  '운영진',
  '씨',
  '개새',
] as const

function nicknameChecks(nickname: string) {
  const lower = nickname.toLowerCase()

  return {
    length: nickname.length >= 2 && nickname.length <= 12,
    charset: NICKNAME_REGEX.test(nickname),
    banned: BANNED_WORDS.some((word) => lower.includes(word.toLowerCase())),
  }
}

function formatBirth(input: string) {
  const digits = input.replace(/\D/g, '').slice(0, 8)

  const year = digits.slice(0, 4)
  const month = digits.slice(4, 6)
  const day = digits.slice(6, 8)

  if (digits.length <= 4) return year
  if (digits.length <= 6) return `${year}-${month}`
  return `${year}-${month}-${day}`
}

export function ExtraInfoStep(props: {
  value: JoinFormState
  onChange: (patch: Partial<JoinFormState>) => void
}) {
  const formValue = props.value

  const nickname = formValue.nickname
  const nicknameTouched = nickname.length > 0
  const nicknameRule = nicknameChecks(nickname)

  const nicknameOk =
    nicknameRule.length && nicknameRule.charset && !nicknameRule.banned

  const ruleClass = (ok: boolean) => {
    if (!nicknameTouched) return 'text-brand-gray-300'
    return ok ? '!text-brand-green' : '!text-brand-error'
  }

  const onBirthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = formatBirth(e.target.value)
    props.onChange({ birth: next })
  }

  return (
    <div className="space-y-5">
      <Field label="닉네임">
        <div className="flex gap-2">
          <Input
            size="sm"
            placeholder="닉네임을 입력해주세요."
            value={nickname}
            onChange={(e) => props.onChange({ nickname: e.target.value })}
          />
          <Button
            type="button"
            size="reg"
            variant="secondary"
            className="h-12 w-28"
            disabled={!nicknameOk}
          >
            중복 확인
          </Button>
        </div>

        <ul className="mt-2 space-y-1 text-xs">
          <li className={ruleClass(nicknameRule.length)}>
            ✓ 최소 2글자, 최대 12글자
          </li>
          <li className={ruleClass(nicknameRule.charset)}>
            ✓ 한글, 영문, 숫자만 사용 가능(공백 및 특수문자 불가)
          </li>
          <li className={ruleClass(!nicknameRule.banned)}>
            ✓ 금지어 포함 불가
          </li>
        </ul>

        {nicknameTouched && nicknameRule.banned && (
          <p className="text-brand-error mt-1 text-sm">
            사용할 수 없는 단어가 포함되어 있습니다.
          </p>
        )}

        {nicknameTouched && nicknameOk && (
          <p className="text-brand-green mt-1 text-sm">
            사용 가능한 닉네임입니다.
          </p>
        )}
      </Field>

      <Field label="생년월일">
        <Input
          size="sm"
          placeholder="YYYY-MM-DD"
          value={formValue.birth}
          onChange={onBirthChange}
          inputMode="numeric"
        />
      </Field>

      <Field label="성별">
        <Dropdown
          value={formValue.gender}
          onValueChange={(value) => props.onChange({ gender: value })}
        >
          <Dropdown.Trigger size="lg">
            <Dropdown.Value placeholder="성별을 선택해주세요." />
          </Dropdown.Trigger>

          <Dropdown.Content>
            <Dropdown.Item value="MALE">남성</Dropdown.Item>
            <Dropdown.Item value="FEMALE">여성</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Field>
    </div>
  )
}

function Field(props: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-brand-gray-500 text-sm">{props.label}</label>
      {props.children}
    </div>
  )
}
