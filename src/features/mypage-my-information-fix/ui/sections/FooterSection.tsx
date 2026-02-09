'use client'

import { Button } from '@/shared/ui/Button'

interface FooterSectionProps {
  onOpenWithdraw: () => void
  onClickSave: () => void
  isSaving: boolean
}

export function FooterSection({
  onOpenWithdraw,
  onClickSave,
  isSaving,
}: FooterSectionProps) {
  return (
    <div className="mt-10 flex items-center justify-between">
      <button
        type="button"
        className="text-brand-gray-300 cursor-pointer text-sm underline underline-offset-4"
        onClick={onOpenWithdraw}
      >
        회원탈퇴
      </button>

      <Button
        type="button"
        variant="primary"
        size="reg"
        className="min-w-44"
        onClick={onClickSave}
        disabled={isSaving}
      >
        내 정보 저장하기
      </Button>
    </div>
  )
}
