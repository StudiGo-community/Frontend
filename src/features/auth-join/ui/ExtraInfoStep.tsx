'use client'

import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'

import type {
  GenderUI,
  JoinFormState,
} from '@/features/auth-join/ui/JoinFunnel'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/Button'
import { Dropdown } from '@/shared/ui/dropdown/Dropdown'

import type { NicknameCheckResponse } from '@/features/auth-join/api/nickname-api'
import { checkNickname } from '@/features/auth-join/api/nickname-api'

type ApiErrorBody = {
  detail?: string
  error_detail?: string
}

function getErrorMessage(error: unknown, fallback: string) {
  if (!isAxiosError<ApiErrorBody>(error)) return fallback
  return (
    error.response?.data?.detail ??
    error.response?.data?.error_detail ??
    fallback
  )
}

interface ExtraInfoStepProps {
  value: JoinFormState
  onChange: (patch: Partial<JoinFormState>) => void
}

export function ExtraInfoStep({ value, onChange }: ExtraInfoStepProps) {
  const [nicknameError, setNicknameError] = useState<string | null>(null)

  const canCheckNickname = useMemo(
    () => Boolean(value.nickname) && !value.nicknameVerified,
    [value.nickname, value.nicknameVerified]
  )

  const checkNicknameMut = useMutation<NicknameCheckResponse, unknown, void>({
    mutationFn: async () => checkNickname(value.nickname),
    onSuccess: (data) => {
      onChange({
        nicknameVerified: true,
        nicknameCheckToken: data.check_token,
      })
      setNicknameError(null)
      toast.success(data.message || '사용 가능한 닉네임입니다.')
    },
    onError: (e: unknown) => {
      onChange({ nicknameVerified: false, nicknameCheckToken: '' })
      const msg = getErrorMessage(e, '이미 사용 중인 닉네임입니다.')
      setNicknameError(msg)
      toast.error(msg)
    },
  })

  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-sm">닉네임</label>
        <div className="mt-1 flex gap-2">
          <Input
            value={value.nickname}
            onChange={(e) => {
              setNicknameError(null)
              onChange({
                nickname: e.target.value,
                nicknameVerified: false,
                nicknameCheckToken: '',
              })
            }}
            placeholder="닉네임을 입력해 주세요"
          />
          <Button
            type="button"
            variant="outline"
            disabled={!canCheckNickname || checkNicknameMut.isPending}
            onClick={() => checkNicknameMut.mutate()}
          >
            중복확인
          </Button>
        </div>

        {value.nicknameVerified && !nicknameError && (
          <p className="text-brand-green mt-1 text-xs">
            사용 가능한 닉네임입니다.
          </p>
        )}
        {nicknameError && (
          <p className="text-brand-error mt-1 text-xs">{nicknameError}</p>
        )}
      </div>

      <div>
        <label className="text-sm">생년월일</label>
        <div className="mt-1">
          <Input
            type="date"
            value={value.birth}
            max={today}
            onChange={(e) => onChange({ birth: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="text-sm">성별</label>
        <div className="mt-1">
          <Dropdown
            value={value.gender || undefined}
            onValueChange={(v) => onChange({ gender: v as GenderUI })}
          >
            <Dropdown.Trigger size="md">
              <Dropdown.Value placeholder="성별을 선택해 주세요" />
            </Dropdown.Trigger>

            <Dropdown.Content>
              <Dropdown.Item value="MALE">남성</Dropdown.Item>
              <Dropdown.Item value="FEMALE">여성</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}
