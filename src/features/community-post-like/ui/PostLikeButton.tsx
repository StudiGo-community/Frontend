'use client'

import { Heart } from 'lucide-react'
import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'

interface PostLikeButtonProps {
  isLiked: boolean
  onClick?: () => void
  className?: string
}

export default function PostLikeButton({
  isLiked,
  onClick,
  className,
}: PostLikeButtonProps) {
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
      <Heart
        size={14}
        strokeWidth={2}
        className={cn('text-brand-third', isLiked && 'fill-brand-third')}
      />
      <span>좋아요</span>
    </Button>
  )
}
