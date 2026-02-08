import { api } from '@/shared/api/client'

export const getPostDetailApi = async (postId: number): Promise<unknown> => {
  const res = await api.get(`/posts/${postId}`)
  return res.data
}
