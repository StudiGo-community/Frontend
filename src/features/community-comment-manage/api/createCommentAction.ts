'use server'

import { cookies } from 'next/headers'
import {
  CommentCreateForm,
  CommentCreateFormSchema,
} from '@/features/community-comment-manage/model/comment-create.schema'
import { api } from '@/shared/api/client'
import { handleActionError } from '@/shared/api/handleActionError'
import { revalidatePath } from 'next/cache'
import { Comment, CommentSchema } from '@/entities/post/model/comment.schema'
import { validateData } from '@/shared/lib/validateData'

export const createCommentAction = async (
  postId: number,
  data: CommentCreateForm
): Promise<Comment> => {
  const payload = validateData(CommentCreateFormSchema, data)

  try {
    const cookieStore = await cookies()
    const response = await api.post(`/posts/${postId}/comments`, payload, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    })

    revalidatePath(`/community/${postId}`)

    return CommentSchema.parse(response.data)
  } catch (error: unknown) {
    return handleActionError(error, '댓글 등록에 실패했습니다.')
  }
}
