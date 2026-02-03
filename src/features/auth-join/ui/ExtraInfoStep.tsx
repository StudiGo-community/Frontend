'use client'

import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'

import type {
  GenderUI,
  JoinFormState,
} from '@/features/auth-join/ui/JoinFunnel'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/Button'
import { Dropdown } from '@/shared/ui/dropdown/Dropdown'
import { useNicknameCheckMutation } from '@/features/auth-join/api/use-nickname-check-mutation'

interface ApiErrorBody {
  detail?: string
  error_detail?: string
}

const getErrorMessage = (error: unknown, fallback: string) => {
  if (!isAxiosError<ApiErrorBody>(error)) return fallback
  return (
    error.response?.data?.detail ??
    error.response?.data?.error_detail ??
    fallback
  )
}

export interface ExtraInfoStepProps {
  value: JoinFormState
  onChange: (patch: Partial<JoinFormState>) => void
}

export const ExtraInfoStep = ({ value, onChange }: ExtraInfoStepProps) => {
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState<
    string | null
  >(null)

  const canCheckNickname = useMemo(() => {
    return Boolean(value.nickname) && !value.nicknameVerified
  }, [value.nickname, value.nicknameVerified])

  const nicknameCheckMutation = useNicknameCheckMutation(value.nickname)

  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-sm">닉네임</label>

        <div className="mt-1 flex gap-2">
          <Input
            value={value.nickname}
            onChange={(event) => {
              setNicknameErrorMessage(null)
              onChange({
                nickname: event.target.value,
                nicknameVerified: false,
                nicknameCheckToken: '',
              })
            }}
            placeholder="닉네임을 입력해 주세요"
          />

          <Button
            type="button"
            variant="outline"
            disabled={!canCheckNickname || nicknameCheckMutation.isPending}
            onClick={async () => {
              try {
                const data = await nicknameCheckMutation.mutateAsync()
                onChange({
                  nicknameVerified: true,
                  nicknameCheckToken: data.check_token,
                })
                setNicknameErrorMessage(null)
                toast.success(data.message || '사용 가능한 닉네임입니다.')
              } catch (error: unknown) {
                onChange({ nicknameVerified: false, nicknameCheckToken: '' })
                const message = getErrorMessage(
                  error,
                  '이미 사용 중인 닉네임입니다.'
                )
                setNicknameErrorMessage(message)
                toast.error(message)
              }
            }}
          >
            중복확인
          </Button>
        </div>

        {value.nicknameVerified && !nicknameErrorMessage && (
          <p className="text-brand-green mt-1 text-xs">
            사용 가능한 닉네임입니다.
          </p>
        )}
        {nicknameErrorMessage && (
          <p className="text-brand-error mt-1 text-xs">
            {nicknameErrorMessage}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm">생년월일</label>
        <div className="mt-1">
          <Input
            type="date"
            value={value.birth}
            max={today}
            onChange={(event) => onChange({ birth: event.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="text-sm">성별</label>
        <div className="mt-1">
          <Dropdown
            value={value.gender || undefined}
            onValueChange={(selectedValue) =>
              onChange({ gender: selectedValue as GenderUI })
            }
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
