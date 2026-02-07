import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CommentCreateForm } from '@/features/community-comment-manage/model/comment-create.schema'
import { createCommentAction } from '@/features/community-comment-manage/api/createCommentAction'
import { toast } from 'sonner'
import { communityKeys } from '@/shared/api/query-keys'

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      postId,
      data,
    }: {
      postId: number
      data: CommentCreateForm
    }) => createCommentAction(postId, data),
    onSuccess: (_, { postId }) => {
      toast.success('댓글이 등록되었습니다.')
      queryClient.invalidateQueries({
        queryKey: communityKeys.post(postId),
      })
      queryClient.invalidateQueries({ queryKey: communityKeys.list() })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
