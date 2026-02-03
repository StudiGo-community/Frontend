'use client'

import { useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { Modal, ModalDescription } from '@/shared/ui/Modal'

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

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="작성을 취소하시겠어요?"
        contentClassName="flex flex-col gap-6"
      >
        <ModalDescription className="text-center">
          작성 중인 내용은 저장되지 않으며, 이전 페이지로 돌아갑니다.
        </ModalDescription>
        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="flex-1"
            size="md"
          >
            계속 쓰기
          </Button>
          <Button
            variant="secondary"
            onClick={handleConfirm}
            className="flex-1"
            size="md"
          >
            나가기
          </Button>
        </div>
      </Modal>
    </>
  )
}
