'use server'

import { api } from '@/shared/api/client'
import { handleActionError } from '@/shared/api/handle-action-error'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const deleteCommentAction = async (
  postId: number,
  commentId: number
) => {
  try {
    const cookieStore = await cookies()
    await api.delete(`/posts/${postId}/comments/${commentId}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    })
    revalidatePath(`/community/${postId}`)
  } catch (error: unknown) {
    handleActionError(error, '댓글 삭제에 실패했습니다.')
  }
}
