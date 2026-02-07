import { api } from '@/shared/api/client'
import type { PageParams } from '@/entities/mypage/model/common-schema'
import { GetLikesResponseSchema } from '@/entities/mypage/model/my-likes-schema'

export const getLikedPostsApi = async (params: PageParams) => {
  const res = await api.get('/me/profile/liked-posts', { params })
  return GetLikesResponseSchema.parse(res.data)
}
