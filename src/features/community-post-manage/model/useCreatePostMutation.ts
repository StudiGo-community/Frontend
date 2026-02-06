import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { PostCreateForm } from '@/features/community-post-manage/model/post-create.schema'
import { createPostAction } from '@/features/community-post-manage/api/createPostAction'
import { toast } from 'sonner'
import { communityKeys } from '@/shared/api/query-keys'

export function useCreatePostMutation() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PostCreateForm) => createPostAction(data),
    onSuccess: () => {
      toast.success('게시글이 등록되었습니다.')
      queryClient.invalidateQueries({ queryKey: communityKeys.list() })
      router.push('/community')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
