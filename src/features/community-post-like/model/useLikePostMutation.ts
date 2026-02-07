import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { communityKeys } from '@/shared/api/query-keys'
import { likePostAction } from '@/features/community-post-like/api/likePostAction'

export function useLikePostMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: number) => likePostAction(postId),
    onSuccess: (_, postId) => {
      toast.success('게시글 좋아요를 성공했습니다.')
      queryClient.invalidateQueries({ queryKey: communityKeys.post(postId) })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
