'use client'

import { useState } from 'react'
import { Siren } from 'lucide-react'
import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'
import { ConfirmModal } from '@/shared/ui/ConfirmModal'

interface CommentReportButtonProps {
  onClick?: () => void
  className?: string
}

export default function CommentReportButton({
  onClick,
  className,
}: CommentReportButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleConfirm = () => {
    console.log('신고')
    setIsModalOpen(false)
    onClick?.()
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsModalOpen(true)}
        className={cn(
          'hover:bg-brand-gray-100 text-sm transition-all duration-200',
          className
        )}
      >
        <Siren size={14} strokeWidth={2} className="text-brand-third" />
        <span>신고</span>
      </Button>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="알림"
      >
        댓글을 <strong className="text-brand-third">신고</strong> 하시겠습니까?
      </ConfirmModal>
    </>
  )
}
