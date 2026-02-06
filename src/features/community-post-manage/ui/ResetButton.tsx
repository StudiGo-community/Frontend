'use client'

import { useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { ConfirmModal } from '@/shared/ui/ConfirmModal'

interface ResetButtonProps {
  onReset: () => void
}

export default function ResetButton({ onReset }: ResetButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleConfirm = () => {
    onReset()
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
        다시쓰기
      </Button>

      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        title="글을 처음부터 다시 쓰시겠어요?"
        confirmText="초기화하기"
      >
        작성 중인 내용이 모두 초기화됩니다.
      </ConfirmModal>
    </>
  )
}
