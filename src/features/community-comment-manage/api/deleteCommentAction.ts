'use server'

import { api } from '@/shared/api/client'
import { isAxiosError } from 'axios'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const deleteCommentAction = async (
  postId: number,
  commentId: number
) => {
  try {
    const cookieStore = await cookies()
    const response = await api.delete(
      `/posts/${postId}/comments/${commentId}`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    )

    console.log(response)

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
        '댓글 삭제에 실패했습니다.'
      throw new Error(errorMessage)
    }

    if (error instanceof Error) {
      throw error
    }

    throw new Error('알 수 없는 에러가 발생했습니다.')
  }
}
