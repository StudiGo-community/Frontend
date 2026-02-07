'use client'

import { useState } from 'react'
import { Siren } from 'lucide-react'
import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'
import { ReportModal } from '@/features/community-report/ui/ReportModal'
import { useReportCommentMutation } from '@/features/community-report/model/useReportCommentMutation'
import { ReportForm } from '@/features/community-report/model/schema'

interface CommentReportButtonProps {
  postId: number
  commentId: number
  className?: string
}

export default function CommentReportButton({
  postId,
  commentId,
  className,
}: CommentReportButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { mutate, isPending } = useReportCommentMutation({
    postId,
    commentId,
  })

  const handleConfirm = (data: ReportForm) => {
    mutate(data, {
      onSettled: () => {
        setIsModalOpen(false)
      },
    })
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
        isPending={isPending}
      />
    </>
  )
}
