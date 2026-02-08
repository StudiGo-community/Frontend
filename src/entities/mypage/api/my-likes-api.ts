import { api } from '@/shared/api/client'
import type { PageParams } from '@/entities/mypage/model/common-schema'
import { GetLikesResponseSchema } from '@/entities/mypage/model/my-likes-schema'

type UnknownRecord = Record<string, unknown>

const isPlainObject = (value: unknown): value is UnknownRecord => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const unwrapResponseData = (responseBody: unknown): unknown => {
  if (isPlainObject(responseBody) && isPlainObject(responseBody.data)) {
    return responseBody.data
  }

  return responseBody
}

const normalizePagination = (
  paginationResponse: unknown,
  fallbackParams: PageParams
) => {
  const paginationObject = isPlainObject(paginationResponse)
    ? paginationResponse
    : {}

  const page =
    typeof paginationObject.current_page === 'number'
      ? paginationObject.current_page
      : typeof paginationObject.page === 'number'
        ? paginationObject.page
        : fallbackParams.page

  const rawTotalPages =
    typeof paginationObject.total_pages === 'number'
      ? paginationObject.total_pages
      : typeof paginationObject.totalPages === 'number'
        ? paginationObject.totalPages
        : 1

  const totalPages = rawTotalPages === 0 ? 1 : rawTotalPages

  const totalCount =
    typeof paginationObject.total_count === 'number'
      ? paginationObject.total_count
      : typeof paginationObject.totalCount === 'number'
        ? paginationObject.totalCount
        : 0

  const hasNext =
    typeof paginationObject.has_next === 'boolean'
      ? paginationObject.has_next
      : typeof paginationObject.hasNext === 'boolean'
        ? paginationObject.hasNext
        : false

  return {
    page,
    size: fallbackParams.size,
    totalCount,
    totalPages,
    hasNext,
  }
}

const normalizeLikesResponse = (
  responseBody: unknown,
  requestParams: PageParams
) => {
  const unwrappedData = unwrapResponseData(responseBody)

  if (
    isPlainObject(unwrappedData) &&
    Array.isArray(unwrappedData.liked_posts)
  ) {
    return {
      posts: unwrappedData.liked_posts,
      pagination: normalizePagination(unwrappedData.pagination, requestParams),
    }
  }

  if (isPlainObject(unwrappedData) && Array.isArray(unwrappedData.posts)) {
    return {
      posts: unwrappedData.posts,
      pagination: normalizePagination(unwrappedData.pagination, requestParams),
    }
  }

  throw new Error('getLikesApi: 응답 형식을 해석할 수 없습니다.')
}

export const getLikesApi = async (params: PageParams) => {
  const response = await api.get('/me/profile/liked-posts', {
    params,
  })

  const normalizedResponse = normalizeLikesResponse(response.data, params)

  return GetLikesResponseSchema.parse(normalizedResponse)
}
