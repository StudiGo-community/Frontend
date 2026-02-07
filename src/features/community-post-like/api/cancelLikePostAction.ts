'use server'

import { handleActionError } from '@/shared/api/handleActionError'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { api } from '@/shared/api/client'
import {
  LikeToggleResponse,
  LikeToggleResponseSchema,
} from '@/features/community-post-like/model/schema'

export const cancelLikePostAction = async (
  postId: number
): Promise<LikeToggleResponse> => {
  try {
    const cookieStore = await cookies()
    const response = await api.delete(`/posts/${postId}/like`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    })

    revalidatePath(`/community/${postId}`)

    return LikeToggleResponseSchema.parse(response.data)
  } catch (error: unknown) {
    return handleActionError(error, '게시글 좋아요 취소에 실패했습니다.')
  }
}
