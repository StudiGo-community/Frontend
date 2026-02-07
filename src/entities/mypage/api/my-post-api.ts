import { api } from '@/shared/api/client'
import type {
  PageParams,
  BulkDeleteBody,
} from '@/entities/mypage/model/common-schema'
import {
  GetMyPostsResponseSchema,
  DeleteMyPostsResponseSchema,
} from '@/entities/mypage/model/my-post-schema'

export const getMyPostsApi = async (params: PageParams) => {
  const res = await api.get('/me/profile/posts', { params })
  return GetMyPostsResponseSchema.parse(res.data)
}

export const deleteMyPostsPostApi = async (body: BulkDeleteBody) => {
  const res = await api.post('/me/profile/posts', body)
  return DeleteMyPostsResponseSchema.parse(res.data)
}

export const deleteMyPostsDeleteApi = async (body?: BulkDeleteBody) => {
  const res = await api.delete(
    '/me/profile/posts',
    body ? { data: body } : undefined
  )
  return DeleteMyPostsResponseSchema.parse(res.data)
}
