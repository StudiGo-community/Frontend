'use client'

import CancelButton from '@/features/community-post-manage/ui/CancelButton'
import ResetButton from '@/features/community-post-manage/ui/ResetButton'
import SubmitButton from '@/features/community-post-manage/ui/SubmitButton'

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
      <CancelButton onCancel={onCancel} />
      <ResetButton onReset={onReset} />
      <SubmitButton isSubmitting={isSubmitting} />
    </div>
  )
}
