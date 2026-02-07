'use server'

import { handleActionError } from '@/shared/api/handleActionError'
import { isAxiosError } from 'axios'
import { cookies } from 'next/headers'
import { api } from '@/shared/api/client'
import {
  PostReportResponse,
  PostReportResponseSchema,
  ReportForm,
  ReportFormSchema,
} from '@/features/community-report/model/schema'
import { validateData } from '@/shared/lib/validateData'

export const reportPostAction = async (
  postId: number,
  data: ReportForm
): Promise<PostReportResponse> => {
  const payload = validateData(ReportFormSchema, data)

  try {
    const cookieStore = await cookies()
    const response = await api.post(`/posts/${postId}/reports`, payload, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    })

    return PostReportResponseSchema.parse(response.data)
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response?.status === 409) {
      throw new Error('이미 신고 처리된 게시글입니다.')
    }
    return handleActionError(error, '게시글 신고에 실패했습니다.')
  }
}
