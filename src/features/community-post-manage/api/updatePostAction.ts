'use server'

import { handleActionError } from '@/shared/api/handle-action-error'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { api } from '@/shared/api/client'
import {
  PostEditFormSchema,
  PostEditForm,
} from '@/features/community-post-manage/model/post-edit.schema'

export const updatePostAction = async (postId: number, data: PostEditForm) => {
  const parsed = PostEditFormSchema.safeParse(data)

  if (!parsed.success) {
    const errorMessage = parsed.error.issues
      .map((issue) => issue.message)
      .join(' / ')
    throw new Error(errorMessage)
  }

  const { thumbnailUrl, ...rest } = parsed.data
  const payload = {
    ...rest,
    thumbnail_url: thumbnailUrl,
  }

  try {
    const cookieStore = await cookies()
    const response = await api.patch(`/posts/${postId}`, payload, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    })

    revalidatePath('/community')
    revalidatePath(`/community/${postId}`)

    return response.data
  } catch (error: unknown) {
    handleActionError(error, '게시글 수정에 실패했습니다.')
  }
}
