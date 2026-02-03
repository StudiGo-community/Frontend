'use client'

import { Button } from '@/shared/ui/Button'

interface FormActionButtonsProps {
  onCancel: () => void
  onReset: () => void
  isSubmitting?: boolean
}

export default function FormActionButtons({
  onCancel,
  onReset,
  isSubmitting,
}: FormActionButtonsProps) {
  return (
    <div className="bg-brand-white border-brand-gray-100 fixed right-0 bottom-0 left-0 z-30 flex justify-end gap-3 border-t p-4 px-6">
      <Button variant="ghost" type="button" onClick={onCancel} size="md">
        취소하기
      </Button>
      <Button variant="ghost" type="button" onClick={onReset} size="md">
        다시쓰기
      </Button>
      <Button
        form="community-form"
        type="submit"
        size="md"
        disabled={isSubmitting}
        className="disabled:bg-brand-gray-200 text-md bg-brand-black px-10 py-6 font-bold text-white transition-all"
      >
        {isSubmitting ? '등록 중...' : '등록하기'}
      </Button>
    </div>
  )
}
