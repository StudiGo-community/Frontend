import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { communityKeys } from '@/shared/api/query-keys'
import { likePostAction } from '@/features/community-post-like/api/likePostAction'
import { PostDetail } from '@/entities/post/model/post.schema'

export function useLikePostMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: number) => likePostAction(postId),
    onMutate: async (postId) => {
      // 1. 해당 포스트의 쿼리를 취소하여 데이터 충돌 방지
      await queryClient.cancelQueries({ queryKey: communityKeys.post(postId) })

      // 2. 이전 데이터 스냅샷 저장
      const previousPost = queryClient.getQueryData<PostDetail>(
        communityKeys.post(postId)
      )

      // 3. 캐시를 새로운 값으로 낙관적 업데이트
      if (previousPost) {
        queryClient.setQueryData<PostDetail>(communityKeys.post(postId), {
          ...previousPost,
          isLiked: true,
          likeCount: previousPost.likeCount + 1,
        })
      }

      // 4. 에러 발생 시 롤백을 위해 스냅샷 반환
      return { previousPost }
    },
    onError: (error, postId, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousPost) {
        queryClient.setQueryData(
          communityKeys.post(postId),
          context.previousPost
        )
      }
      toast.error(error.message)
    },
    onSettled: (_, __, postId) => {
      // 성공/실패 여부와 상관없이 서버 데이터와 동기화 (댓글 등 하위 쿼리는 건드리지 않음)
      queryClient.invalidateQueries({
        queryKey: communityKeys.post(postId),
        exact: true,
      })
    },
  })
}
