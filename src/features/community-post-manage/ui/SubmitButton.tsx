'use client'

import { useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { Modal, ModalDescription } from '@/shared/ui/Modal'

interface SubmitButtonProps {
  isSubmitting?: boolean
}

export default function SubmitButton({ isSubmitting }: SubmitButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        type="button"
        onClick={(e) => {
          e.currentTarget.focus()
          setIsOpen(true)
        }}
        size="md"
        disabled={isSubmitting}
        className="disabled:bg-brand-gray-200 text-md bg-brand-black hover:bg-brand-black/80 px-10 py-6 font-bold text-white"
      >
        {isSubmitting ? '등록 중...' : '등록하기'}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="글을 등록하시겠어요?"
        contentClassName="flex flex-col gap-6"
      >
        <ModalDescription className="text-center">
          등록된 글은 모든 사용자가 볼 수 있습니다.
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
            form="post-form"
            type="submit"
            variant="secondary"
            onClick={() => setIsOpen(false)}
            disabled={isSubmitting}
            size="md"
            className="flex-1"
          >
            {isSubmitting ? '등록 중...' : '등록하기'}
          </Button>
        </div>
      </Modal>
    </>
  )
}
