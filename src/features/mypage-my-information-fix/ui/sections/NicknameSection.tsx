'use client'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'
import { cn } from '@/shared/lib/cn'

interface NicknameSectionProps {
  nickname: string
  onChangeNickname: (next: string) => void
  onClickCheckNickname: () => void
  isCheckNicknamePending: boolean
  nicknameValidation: { isLengthOk: boolean; isCharacterOk: boolean }
  nicknameRuleTextColor: (ok: boolean) => string
  isNicknameChanged: boolean
  isNicknameCheckValid: boolean
}

export function NicknameSection({
  nickname,
  onChangeNickname,
  onClickCheckNickname,
  isCheckNicknamePending,
  nicknameValidation,
  nicknameRuleTextColor,
  isNicknameChanged,
  isNicknameCheckValid,
}: NicknameSectionProps) {
  return (
    <div className="mt-10">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <p className="text-brand-gray-400 mb-2 text-sm">닉네임</p>
          <Input
            value={nickname}
            onChange={(event) => onChangeNickname(event.target.value)}
            placeholder="닉네임을 입력해 주세요"
          />
        </div>

        <Button
          type="button"
          variant="secondary"
          size="md"
          className="min-w-32"
          onClick={onClickCheckNickname}
          disabled={isCheckNicknamePending}
        >
          중복 확인
        </Button>
      </div>

      <div className="mt-3 text-xs leading-5">
        <p className={nicknameRuleTextColor(nicknameValidation.isLengthOk)}>
          ✓ 최소 2글자 최대 12글자
        </p>
        <p className={nicknameRuleTextColor(nicknameValidation.isCharacterOk)}>
          ✓ 한글, 영문, 숫자만 사용 가능 (특수문자, 공백 불가)
        </p>
        <p className="text-brand-green">✓ 금지어 포함 불가</p>

        {isNicknameChanged && (
          <p
            className={cn(
              'mt-2',
              isNicknameCheckValid ? 'text-brand-green' : 'text-brand-main'
            )}
          >
            {isNicknameCheckValid
              ? '✓ 중복 확인 완료'
              : '✕ 중복 확인이 필요합니다'}
          </p>
        )}
      </div>
    </div>
  )
}
