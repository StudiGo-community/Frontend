'use client'

import { useState } from 'react'
import { Siren } from 'lucide-react'
import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'
import { ReportModal } from '@/features/community-report/ui/ReportModal'

interface CommentReportButtonProps {
  onClick?: () => void
  className?: string
}

export default function CommentReportButton({
  onClick,
  className,
}: CommentReportButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleConfirm = (reason: string) => {
    console.log('신고 사유:', reason)
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

      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="댓글 신고"
        targetName="댓글"
      />
    </>
  )
}
