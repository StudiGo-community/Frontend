'use client'

import { useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { Modal, ModalDescription } from '@/shared/ui/Modal'

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

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="글을 처음부터 다시 쓰시겠어요?"
        contentClassName="flex flex-col gap-6"
      >
        <ModalDescription className="text-center">
          작성 중인 내용이 모두 초기화됩니다.
        </ModalDescription>
        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="flex-1"
            size="md"
          >
            취소
          </Button>
          <Button
            variant="secondary"
            onClick={handleConfirm}
            className="flex-1"
            size="md"
          >
            초기화하기
          </Button>
        </div>
      </Modal>
    </>
  )
}
