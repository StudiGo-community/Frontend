import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { CommentCreateForm } from '@/features/community-comment-manage/model/comment-create.schema'
import { createCommentAction } from '@/features/community-comment-manage/api/createCommentAction'
import { toast } from 'sonner'
import { communityKeys } from '@/shared/api/query-keys'

export const useCreateCommentMutation = (postId: number) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CommentCreateForm) => createCommentAction(postId, data),
    onSuccess: () => {
      toast.success('댓글이 등록되었습니다.')
      queryClient.invalidateQueries({
        queryKey: communityKeys.post(postId),
      })
      queryClient.invalidateQueries({ queryKey: communityKeys.list() })
      router.refresh()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
