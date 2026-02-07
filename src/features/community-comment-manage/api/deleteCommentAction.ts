'use server'

import { api } from '@/shared/api/client'
import { handleActionError } from '@/shared/api/handleActionError'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const deleteCommentAction = async (
  postId: number,
  commentId: number
): Promise<void> => {
  try {
    const cookieStore = await cookies()
    await api.delete(`/posts/${postId}/comments/${commentId}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    })
    revalidatePath(`/community/${postId}`)
    return
  } catch (error: unknown) {
    return handleActionError(error, '댓글 삭제에 실패했습니다.')
  }
}
