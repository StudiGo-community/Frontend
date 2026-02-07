'use server'

import { handleActionError } from '@/shared/api/handle-action-error'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { api } from '@/shared/api/client'
import {
  CommentReportResponse,
  CommentReportResponseSchema,
  ReportForm,
  ReportFormSchema,
} from '@/features/community-report/model/schema'

import { validateData } from '@/shared/lib/validateData'

export const reportCommentAction = async (
  postId: number,
  commentId: number,
  data: ReportForm
): Promise<CommentReportResponse> => {
  const payload = validateData(ReportFormSchema, data)

  try {
    const cookieStore = await cookies()
    const response = await api.post(
      `/posts/${postId}/comments/${commentId}/reports`,
      payload,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    )

    revalidatePath(`/community/${postId}`)

    return CommentReportResponseSchema.parse(response.data)
  } catch (error: unknown) {
    return handleActionError(error, '댓글 신고에 실패했습니다.')
  }
}
