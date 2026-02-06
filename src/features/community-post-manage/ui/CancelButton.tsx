'use client'

import { useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { ConfirmModal } from '@/shared/ui/ConfirmModal'

interface CancelButtonProps {
  onCancel: () => void
}

export default function CancelButton({ onCancel }: CancelButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleConfirm = () => {
    onCancel()
    setIsOpen(false)
  }

  return (
    <>
      <Button
        variant="ghost"
        type="button"
        onClick={(e) => {
          e.currentTarget.focus()
          setIsOpen(true)
        }}
        size="md"
        className="px-5"
      >
        취소하기
      </Button>

      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        title="작성을 취소하시겠어요?"
        confirmText="나가기"
      >
        작성 중인 내용은 저장되지 않고, 이전으로 돌아갑니다.
      </ConfirmModal>
    </>
  )
}
