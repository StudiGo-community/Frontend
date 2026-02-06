import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { deletePostAction } from '@/features/community-post-manage/api/deletePostAction'
import { toast } from 'sonner'
import { communityKeys } from '@/shared/api/query-keys'

export const useDeletePostMutation = (postId: number) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deletePostAction(postId),
    onSuccess: () => {
      toast.success('게시글이 삭제되었습니다.')
      queryClient.invalidateQueries({ queryKey: communityKeys.list() })
      router.refresh()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
