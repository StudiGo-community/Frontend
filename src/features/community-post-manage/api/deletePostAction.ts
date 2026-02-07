'use server'

import { api } from '@/shared/api/client'
import { handleActionError } from '@/shared/api/handle-action-error'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const deletePostAction = async (postId: number): Promise<void> => {
  try {
    const cookieStore = await cookies()
    await api.delete(`/posts/${postId}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    })
    revalidatePath(`/community`)
    return
  } catch (error: unknown) {
    return handleActionError(error, '게시글 삭제에 실패했습니다.')
  }
}
