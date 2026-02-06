'use server'

import { cookies } from 'next/headers'
import {
  CommentCreateForm,
  CommentCreateFormSchema,
} from '../model/comment-create.schema'
import { api } from '@/shared/api/client'
import { isAxiosError } from 'axios'
import { revalidatePath } from 'next/cache'

export const createCommentAction = async (
  postId: number,
  data: CommentCreateForm
) => {
  const parsed = CommentCreateFormSchema.safeParse(data)

  if (!parsed.success) {
    const errorMessage = parsed.error.issues
      .map((issue) => issue.message)
      .join(' / ')
    throw new Error(errorMessage)
  }

  const payload = parsed.data
  console.log(payload)

  try {
    const cookieStore = await cookies()
    const response = await api.post(`/posts/${postId}/comments`, payload, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    })

    revalidatePath(`/community/${postId}`)

    return response.data
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const status = error.response?.status

      if (status === 401) {
        throw new Error('로그인이 필요하거나 만료되었습니다.')
      }

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        '댓글 등록에 실패했습니다.'
      throw new Error(errorMessage)
    }

    if (error instanceof Error) {
      throw error
    }

    throw new Error('알 수 없는 에러가 발생했습니다.')
  }
}
