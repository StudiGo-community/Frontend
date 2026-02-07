import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCommentAction } from '@/features/community-comment-manage/api/deleteCommentAction'
import { toast } from 'sonner'
import { communityKeys } from '@/shared/api/query-keys'

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      postId,
      commentId,
    }: {
      postId: number
      commentId: number
    }) => deleteCommentAction(postId, commentId),
    onSuccess: (_, { postId }) => {
      toast.success('댓글이 삭제되었습니다.')
      queryClient.invalidateQueries({ queryKey: communityKeys.post(postId) })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
