import { api } from '@/shared/api/client'
import { PostDetail, PostDetailSchema } from '@/entities/post/model/post.schema'

export default async function getPost(id: number) {
  const response = await api.get<PostDetail>(`/posts/${id}`)

  return PostDetailSchema.parse(response.data)
}
