import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { deleteCommentAction } from '@/features/community-comment-manage/api/deleteCommentAction'
import { toast } from 'sonner'
import { communityKeys } from '@/shared/api/query-keys'

export const useDeleteCommentMutation = (postId: number) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (commentId: number) => deleteCommentAction(postId, commentId),
    onSuccess: () => {
      toast.success('댓글이 삭제되었습니다.')
      queryClient.invalidateQueries({ queryKey: communityKeys.post(postId) })
      router.refresh()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
