import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { PostEditForm } from '@/features/community-post-manage/model/post-edit.schema'
import { updatePostAction } from '@/features/community-post-manage/api/updatePostAction'
import { toast } from 'sonner'
import { communityKeys } from '@/shared/api/query-keys'

export function useUpdatePostMutation(postId: number) {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PostEditForm) => updatePostAction(postId, data),
    onSuccess: () => {
      toast.success('게시글이 수정되었습니다.')
      queryClient.invalidateQueries({ queryKey: communityKeys.list() })
      queryClient.invalidateQueries({ queryKey: communityKeys.post(postId) })
      router.push(`/community/${postId}`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
