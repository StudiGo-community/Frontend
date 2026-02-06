'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'
import { ConfirmModal } from '@/shared/ui/ConfirmModal'

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
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleConfirm = () => {
    console.log('좋아요')
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

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="알림"
      >
        게시글을 <span className="text-brand-second">좋아요</span> 하시겠습니까?
      </ConfirmModal>
    </>
  )
}
