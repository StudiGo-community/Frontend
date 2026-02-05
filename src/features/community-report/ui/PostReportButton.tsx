'use client'

import { Siren } from 'lucide-react'
import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'

interface PostReportButtonProps {
  onClick?: () => void
  className?: string
}

export default function PostReportButton({
  onClick,
  className,
}: PostReportButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className={cn(
        'hover:bg-brand-gray-100 w-24 text-sm transition-all duration-200',
        className
      )}
    >
      <Siren size={14} strokeWidth={2} className="text-brand-third" />
      <span>신고</span>
    </Button>
  )
}
