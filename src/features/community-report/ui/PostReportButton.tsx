'use client'

import { useState } from 'react'
import { Siren } from 'lucide-react'
import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'
import { ReportModal } from '@/features/community-report/ui/ReportModal'
import { useReportPostMutation } from '@/features/community-report/model/useReportPostMutation'
import { ReportForm } from '@/features/community-report/model/schema'

interface PostReportButtonProps {
  postId: number
  className?: string
}

export default function PostReportButton({
  postId,
  className,
}: PostReportButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { mutate, isPending } = useReportPostMutation({
    postId,
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
          'hover:bg-brand-gray-100 w-24 text-sm transition-all duration-200',
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
        title="게시글 신고"
        targetName="게시글"
        isPending={isPending}
      />
    </>
  )
}
