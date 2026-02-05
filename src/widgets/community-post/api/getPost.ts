import { api } from '@/shared/api/client'
import axios from 'axios'
import { PostDetail, PostDetailSchema } from '@/entities/post/model/post.schema'

export default async function getPost(id: number): Promise<PostDetail | null> {
  try {
    const response = await api.get(`/posts/${id}`)
    return PostDetailSchema.parse(response.data)
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null
    }
    throw error
  }
}
