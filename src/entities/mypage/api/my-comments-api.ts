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
  let data: unknown = res.data

  if (data == null || data === '') {
    throw new Error('응답 바디가 비어있습니다.')
  }

  if (typeof data === 'object') {
    const maybe = data as Record<string, unknown>
    const inner =
      maybe && typeof maybe.data === 'object' && maybe.data !== null
        ? (maybe.data as Record<string, unknown>)
        : maybe

    const backfillPagination = (value: unknown) => {
      if (value == null || typeof value !== 'object') return value
      const obj = value as Record<string, unknown>
      const pagination = obj.pagination
      if (pagination == null || typeof pagination !== 'object') return value
      const paginationRecord = pagination as Record<string, unknown>
      const page = paginationRecord.page
      const size = paginationRecord.size

      if (typeof page === 'number' && typeof size === 'number') return value

      return {
        ...obj,
        pagination: {
          ...(typeof pagination === 'object' ? (pagination as object) : {}),
          page: typeof page === 'number' ? page : params.page,
          size: typeof size === 'number' ? size : params.size,
        },
      }
    }

    if (maybe && typeof maybe.data === 'object' && maybe.data !== null) {
      data = {
        ...maybe,
        data: backfillPagination(maybe.data),
      }
    } else {
      data = backfillPagination(maybe)
    }

    if (!('comments' in inner) && typeof maybe.message === 'string') {
      const message = maybe.message.trim()

      if (
        message === '작성한 댓글이 없습니다.' ||
        message === '댓글이 없습니다.'
      ) {
        return {
          comments: [],
          pagination: {
            page: params.page,
            size: params.size,
            totalCount: 0,
            totalPages: 1,
            hasNext: false,
          },
        }
      }

      throw new Error(message)
    }
  }

  return GetMyCommentsResponseSchema.parse(data)
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
