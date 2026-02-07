import { api } from '@/shared/api/client'
import type {
  PageParams,
  BulkDeleteBody,
} from '@/entities/mypage/model/common-schema'
import {
  GetMyCommentsResponseSchema,
  DeleteMyCommentsResponseSchema,
} from '@/entities/mypage/model/my-comments-schema'

export const getMyCommentsApi = async (params: PageParams) => {
  const res = await api.get('/me/profile/comments', { params })
  return GetMyCommentsResponseSchema.parse(res.data)
}

export const deleteMyCommentsPostApi = async (body: BulkDeleteBody) => {
  const res = await api.post('/me/profile/comments', body)
  return DeleteMyCommentsResponseSchema.parse(res.data)
}

export const deleteMyCommentsDeleteApi = async (body?: BulkDeleteBody) => {
  const res = await api.delete(
    '/me/profile/comments',
    body ? { data: body } : undefined
  )
  return DeleteMyCommentsResponseSchema.parse(res.data)
}
