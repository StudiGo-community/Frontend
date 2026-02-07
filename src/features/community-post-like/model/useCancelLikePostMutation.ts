import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { communityKeys } from '@/shared/api/query-keys'
import { cancelLikePostAction } from '@/features/community-post-like/api/cancelLikePostAction'

export function useCancelLikePostMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: number) => cancelLikePostAction(postId),
    onSuccess: (_, postId) => {
      toast.success('게시글 좋아요를 취소했습니다.')
      queryClient.invalidateQueries({ queryKey: communityKeys.post(postId) })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
