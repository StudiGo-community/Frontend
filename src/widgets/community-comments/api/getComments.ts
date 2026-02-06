import { api } from '@/shared/api/client'
import {
  CommentList,
  CommentListSchema,
} from '@/entities/post/model/comment.schema'

const PAGE_SIZE = 5

export default async function getComments(
  postId: number,
  page?: number
): Promise<CommentList> {
  const response = await api.get(`/posts/${postId}/comments/list`, {
    params: {
      size: PAGE_SIZE,
      page,
    },
  })

  return CommentListSchema.parse(response.data)
}
