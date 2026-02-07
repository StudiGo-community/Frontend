import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { reportPostAction } from '@/features/community-report/api/reportPostAction'
import { ReportForm } from '@/features/community-report/model/schema'

export function useReportPostMutation() {
  return useMutation({
    mutationFn: ({ postId, data }: { postId: number; data: ReportForm }) =>
      reportPostAction(postId, data),
    onSuccess: () => {
      toast.success('게시글이 신고되었습니다.')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
