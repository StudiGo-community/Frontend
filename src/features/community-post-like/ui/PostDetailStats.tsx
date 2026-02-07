'use client'

import { useQuery } from '@tanstack/react-query'
import { communityKeys } from '@/shared/api/query-keys'
import { PostDetail, PostDetailSchema } from '@/entities/post/model/post.schema'
import { api } from '@/shared/api/client'
import PostStats from '@/entities/post/ui/PostStats'

interface PostDetailStatsProps {
  postId: number
  viewCount: number
  likeCount: number
  commentCount: number
  className?: string
}

async function fetchPost(postId: number): Promise<PostDetail> {
  const response = await api.get(`/posts/${postId}`)
  return PostDetailSchema.parse(response.data)
}

export default function PostDetailStats({
  postId,
  viewCount,
  likeCount: initialLikeCount,
  commentCount,
  className,
}: PostDetailStatsProps) {
  // 전역 캐시를 구독하여 낙관적 업데이트 결과를 즉시 반영합니다.
  const { data: cachedPost } = useQuery<PostDetail>({
    queryKey: communityKeys.post(postId),
    queryFn: () => fetchPost(postId),
    enabled: false,
  })

  // 캐시된 데이터가 있으면 캐시 값을, 없으면 서버 초기값을 사용합니다.
  const likeCount = cachedPost ? cachedPost.likeCount : initialLikeCount

  return (
    <PostStats
      viewCount={viewCount}
      likeCount={likeCount}
      commentCount={commentCount}
      className={className}
    />
  )
}
