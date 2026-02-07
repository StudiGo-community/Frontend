import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import {
  PageParamsSchema,
  type PageParams,
} from '@/entities/mypage/model/common-schema'
import type { GetMyPostsResponse } from '@/entities/mypage/model/my-post-schema'
import { getMyPostsApi } from '@/entities/mypage/api/my-post-api'
import { mypageKeys } from '@/shared/api/query-keys'

export const useMyPosts = (
  raw: Partial<{ page: number; size: number; sort: 'latest' | 'oldest' }>,
  options?: Omit<UseQueryOptions<GetMyPostsResponse>, 'queryKey' | 'queryFn'>
) => {
  const params: PageParams = PageParamsSchema.parse({
    page: raw.page ?? 1,
    size: raw.size ?? 10,
    sort: raw.sort ?? 'latest',
  })

  return useQuery({
    queryKey: mypageKeys.myPostsList(params.page, params.size, params.sort),
    queryFn: () => getMyPostsApi(params),
    ...options,
  })
}
