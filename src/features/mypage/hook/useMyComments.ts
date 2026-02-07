import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import {
  PageParamsSchema,
  type PageParams,
} from '@/entities/mypage/model/common-schema'
import type { GetMyCommentsResponse } from '@/entities/mypage/model/my-comments-schema'
import { getMyCommentsApi } from '@/entities/mypage/api/my-comments-api'
import { mypageKeys } from '@/shared/api/query-keys'

export const useMyComments = (
  raw: Partial<{ page: number; size: number; sort: 'latest' | 'oldest' }>,
  options?: Omit<UseQueryOptions<GetMyCommentsResponse>, 'queryKey' | 'queryFn'>
) => {
  const params: PageParams = PageParamsSchema.parse({
    page: raw.page ?? 1,
    size: raw.size ?? 10,
    sort: raw.sort ?? 'latest',
  })

  return useQuery({
    queryKey: mypageKeys.myCommentsList(params.page, params.size, params.sort),
    queryFn: () => getMyCommentsApi(params),
    ...options,
  })
}
