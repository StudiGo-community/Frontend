'use server'

import { cookies } from 'next/headers'
import {
  CommentCreateForm,
  CommentCreateFormSchema,
} from '../model/comment-create.schema'
import { api } from '@/shared/api/client'
import { handleActionError } from '@/shared/api/handle-action-error'
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
    handleActionError(error, '댓글 등록에 실패했습니다.')
  }
}
