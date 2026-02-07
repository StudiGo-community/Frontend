'use server'

import { handleActionError } from '@/shared/api/handle-action-error'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { api } from '@/shared/api/client'
import {
  ReportForm,
  ReportFormSchema,
} from '@/features/community-report/model/schema'

export const reportCommentAction = async (
  postId: number,
  commentId: number,
  data: ReportForm
): Promise<ReportForm> => {
  const parsed = ReportFormSchema.safeParse(data)

  if (!parsed.success) {
    const errorMessage = parsed.error.issues
      .map((issue) => issue.message)
      .join(' / ')
    throw new Error(errorMessage)
  }

  const payload = parsed.data

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

    return response.data
  } catch (error: unknown) {
    return handleActionError(error, '댓글 신고에 실패했습니다.')
  }
}
