'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'
import { useLikePostMutation } from '@/features/community-post-like/model/useLikePostMutation'
import { useCancelLikePostMutation } from '@/features/community-post-like/model/useCancelLikePostMutation'
import { useQuery } from '@tanstack/react-query'
import { communityKeys } from '@/shared/api/query-keys'
import { PostDetail, PostDetailSchema } from '@/entities/post/model/post.schema'
import { api } from '@/shared/api/client'

interface PostLikeButtonProps {
  postId: number
  isLiked: boolean
  className?: string
}

async function fetchPost(postId: number): Promise<PostDetail> {
  const response = await api.get(`/posts/${postId}`)
  return PostDetailSchema.parse(response.data)
}

export default function PostLikeButton({
  postId,
  isLiked: initialIsLiked,
  className,
}: PostLikeButtonProps) {
  const [isAnimate, setIsAnimate] = useState(false)

  // 전역 캐시 상태를 구독합니다. 낙관적 업데이트 결과가 즉시 반영됩니다.
  // queryFn을 제공하여 "No queryFn" 에러를 방지하고, 필요 시 refetch가 가능하게 합니다.
  const { data: cachedPost } = useQuery<PostDetail>({
    queryKey: communityKeys.post(postId),
    queryFn: () => fetchPost(postId),
    enabled: false, // 이 컴포넌트가 마운트될 때 불필요한 네트워크 요청은 막습니다.
    initialData: undefined, // 초기 데이터는 props를 우선 사용하되, 캐시가 있으면 캐시를 씁니다.
  })

  // 캐시된 포스트의 좋아요 정보가 있으면 그것을 최우선으로 보여줍니다.
  const isLiked = cachedPost ? cachedPost.isLiked : initialIsLiked

  const { mutate: likeMutate } = useLikePostMutation()
  const { mutate: cancelMutate } = useCancelLikePostMutation()

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // 넉넉하게 연타가 가능하도록 isPending 제한을 제거합니다.
    if (isLiked) {
      cancelMutate(postId)
    } else {
      setIsAnimate(true)
      setTimeout(() => setIsAnimate(false), 300)
      likeMutate(postId)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLikeToggle}
      // 네트워크 대기 중에도 버튼을 비활성화하지 않아 체감이 훨씬 좋아집니다.
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
          isLiked && 'fill-brand-third',
          isAnimate ? 'scale-125' : 'scale-100'
        )}
      />
      <span>좋아요</span>
    </Button>
  )
}
