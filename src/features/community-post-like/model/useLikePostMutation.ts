import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { likePostAction } from '@/features/community-post-like/api/likePostAction'
import { useRouter } from 'next/navigation'

export function useLikePostMutation() {
  const router = useRouter()

  return useMutation({
    mutationFn: (postId: number) => likePostAction(postId),
    onSuccess: () => {
      toast.success('이 게시글을 좋아합니다.')
      router.refresh()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
