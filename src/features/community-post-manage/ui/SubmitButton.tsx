'use client'

import { useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { ConfirmModal } from '@/shared/ui/ConfirmModal'

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

      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)} // Submit handles the action via form
        title="글을 등록하시겠어요?"
        confirmText={isSubmitting ? '등록 중...' : '등록하기'}
        isPending={isSubmitting}
        submit
        formId="post-form"
      >
        등록된 글은 모든 사용자가 볼 수 있습니다.
      </ConfirmModal>
    </>
  )
}
