import { api } from '@/shared/api/client'
import {
  CommentList,
  CommentListSchema,
} from '@/entities/post/model/comment.schema'

export default async function getComments(postId: number, page?: number) {
  const response = await api.get<CommentList>(
    `/posts/${postId}/comments/list`,
    {
      params: {
        size: 5,
        page: page || 1,
      },
    }
  )

  console.log(CommentListSchema.parse(response.data))
  return CommentListSchema.parse(response.data)
}
