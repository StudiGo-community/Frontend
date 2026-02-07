import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import {
  PageParamsSchema,
  type PageParams,
} from '@/entities/mypage/model/common-schema'
import type { GetLikesResponse } from '@/entities/mypage/model/my-likes-schema'
import { getLikedPostsApi } from '@/entities/mypage/api/my-likes-api'
import { mypageKeys } from '@/shared/api/query-keys'

export const useLikedPosts = (
  raw: Partial<{ page: number; size: number; sort: 'latest' | 'oldest' }>,
  options?: Omit<UseQueryOptions<GetLikesResponse>, 'queryKey' | 'queryFn'>
) => {
  const params: PageParams = PageParamsSchema.parse({
    page: raw.page ?? 1,
    size: raw.size ?? 10,
    sort: raw.sort ?? 'latest',
  })

  return useQuery({
    queryKey: mypageKeys.likesList(params.page, params.size, params.sort),
    queryFn: () => getLikedPostsApi(params),
    ...options,
  })
}
