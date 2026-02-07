'use server'

import { handleActionError } from '@/shared/api/handle-action-error'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { api } from '@/shared/api/client'
import {
  PostEditFormSchema,
  PostEditForm,
  PostEditResponse,
  PostEditResponseSchema,
} from '@/features/community-post-manage/model/post-edit.schema'

import { validateData } from '@/shared/lib/validateData'

export const updatePostAction = async (
  postId: number,
  data: PostEditForm
): Promise<PostEditResponse> => {
  const { thumbnailUrl, ...rest } = validateData(PostEditFormSchema, data)
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

    return PostEditResponseSchema.parse(response.data)
  } catch (error: unknown) {
    return handleActionError(error, '게시글 수정에 실패했습니다.')
  }
}
