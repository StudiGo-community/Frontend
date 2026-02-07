import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { cancelLikePostAction } from '@/features/community-post-like/api/cancelLikePostAction'
import { useRouter } from 'next/navigation'

export function useCancelLikePostMutation() {
  const router = useRouter()

  return useMutation({
    mutationFn: (postId: number) => cancelLikePostAction(postId),
    onSuccess: () => {
      toast.success('좋아요를 취소했습니다.')
      router.refresh()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
