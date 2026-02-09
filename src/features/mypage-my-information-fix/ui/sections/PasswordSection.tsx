'use client'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'
import { cn } from '@/shared/lib/cn'

interface PasswordSectionProps {
  isPasswordEditing: boolean
  currentPassword: string
  newPassword: string
  newPasswordConfirm: string
  onChangeCurrentPassword: (v: string) => void
  onChangeNewPassword: (v: string) => void
  onChangeNewPasswordConfirm: (v: string) => void
  onTogglePasswordEdit: () => void
  passwordRuleTextColor: (ok: boolean) => string
  newPasswordValidation: {
    isMinimumLengthOk: boolean
    isCombinationOk: boolean
  }
  isNewPasswordMismatch: boolean
}

export function PasswordSection({
  isPasswordEditing,
  currentPassword,
  newPassword,
  newPasswordConfirm,
  onChangeCurrentPassword,
  onChangeNewPassword,
  onChangeNewPasswordConfirm,
  onTogglePasswordEdit,
  passwordRuleTextColor,
  newPasswordValidation,
  isNewPasswordMismatch,
}: PasswordSectionProps) {
  return (
    <div className="mt-8">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <p className="text-brand-gray-400 mb-2 text-sm">현재 비밀번호</p>
          <Input
            type="password"
            value={currentPassword}
            onChange={(event) => onChangeCurrentPassword(event.target.value)}
            placeholder="현재 비밀번호를 입력해 주세요."
            disabled={!isPasswordEditing}
          />
        </div>

        <Button
          type="button"
          variant="secondary"
          size="md"
          className="min-w-32"
          onClick={onTogglePasswordEdit}
        >
          {isPasswordEditing ? '변경 취소' : '비밀번호 변경'}
        </Button>
      </div>

      {isPasswordEditing && (
        <div className="mt-6 grid grid-cols-1 gap-6">
          <div>
            <p className="text-brand-gray-400 mb-2 text-sm">새 비밀번호</p>

            <Input
              type="password"
              value={newPassword}
              onChange={(event) => onChangeNewPassword(event.target.value)}
              placeholder="새 비밀번호를 입력해주세요."
            />

            <div className="mt-3 text-sm leading-6">
              <p
                className={cn(
                  passwordRuleTextColor(newPasswordValidation.isMinimumLengthOk)
                )}
              >
                ✓ 최소 8글자
              </p>
              <p
                className={cn(
                  passwordRuleTextColor(newPasswordValidation.isCombinationOk)
                )}
              >
                ✓ 영문, 숫자, 특수문자 조합
              </p>
            </div>
          </div>

          <div>
            <p className="text-brand-gray-400 mb-2 text-sm">새 비밀번호 확인</p>

            <Input
              type="password"
              value={newPasswordConfirm}
              onChange={(event) =>
                onChangeNewPasswordConfirm(event.target.value)
              }
              placeholder="새 비밀번호를 한 번 더 입력해주세요."
            />

            {isNewPasswordMismatch && (
              <p className="text-brand-main mt-2 text-sm">
                새 비밀번호가 일치하지 않습니다
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
