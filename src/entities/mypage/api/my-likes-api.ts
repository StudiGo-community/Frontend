import { api } from '@/shared/api/client'
import type { PageParams } from '@/entities/mypage/model/common-schema'
import { GetLikesResponseSchema } from '@/entities/mypage/model/my-likes-schema'

export const getLikesApi = async (params: PageParams) => {
  const res = await api.get('/me/profile/liked-posts', { params })
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

    if (!('posts' in inner) && typeof maybe.message === 'string') {
      const message = maybe.message.trim()

      // 백엔드가 "빈 목록"을 message-only로 주는 케이스는 정상(empty)로 처리
      if (
        message === '좋아한 게시글이 없습니다.' ||
        message === '좋아요한 게시글이 없습니다.'
      ) {
        return {
          posts: [],
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

  return GetLikesResponseSchema.parse(data)
}
