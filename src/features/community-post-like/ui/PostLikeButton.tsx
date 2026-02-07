'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'
import { useLikePostMutation } from '@/features/community-post-like/model/useLikePostMutation'
import { useCancelLikePostMutation } from '@/features/community-post-like/model/useCancelLikePostMutation'

interface PostLikeButtonProps {
  postId: number
  isLiked: boolean
  className?: string
}

export default function PostLikeButton({
  postId,
  isLiked: initialIsLiked,
  className,
}: PostLikeButtonProps) {
  const [isAnimate, setIsAnimate] = useState(false)
  const [isLiked, setIsLiked] = useState(initialIsLiked)

  // 서버에서 새로운 props가 내려오면(router.refresh) 로컬 상태 동기화
  useEffect(() => {
    setIsLiked(initialIsLiked)
  }, [initialIsLiked])

  const { mutate: likeMutate } = useLikePostMutation()
  const { mutate: cancelMutate } = useCancelLikePostMutation()

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // 1. 낙관적 업데이트: 로컬 상태 즉시 변경
    const nextIsLiked = !isLiked
    setIsLiked(nextIsLiked)

    if (nextIsLiked) {
      // 좋아요
      setIsAnimate(true)
      setTimeout(() => setIsAnimate(false), 300)
      likeMutate(postId, {
        onError: () => setIsLiked(!nextIsLiked), // 실패 시 롤백
      })
    } else {
      // 좋아요 취소
      cancelMutate(postId, {
        onError: () => setIsLiked(!nextIsLiked), // 실패 시 롤백
      })
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLikeToggle}
      className={cn(
        'hover:bg-brand-gray-100 w-24 text-sm transition-all duration-200 active:scale-95',
        isLiked ? 'border-brand-third bg-brand-third/10' : '',
        className
      )}
    >
      <Heart
        size={14}
        strokeWidth={2}
        className={cn(
          'text-brand-third transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]',
          isLiked ? 'fill-brand-third scale-125' : 'scale-100',
          isAnimate && 'scale-125'
        )}
      />
      <span>좋아요</span>
    </Button>
  )
}
