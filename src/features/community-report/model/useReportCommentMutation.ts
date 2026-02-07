import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { reportCommentAction } from '@/features/community-report/api/reportCommentAction'
import { ReportForm } from '@/features/community-report/model/schema'

export function useReportCommentMutation() {
  return useMutation({
    mutationFn: ({
      postId,
      commentId,
      data,
    }: {
      postId: number
      commentId: number
      data: ReportForm
    }) => reportCommentAction(postId, commentId, data),
    onSuccess: () => {
      toast.success('댓글이 신고되었습니다.')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
