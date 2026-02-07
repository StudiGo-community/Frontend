import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query'
import { BulkDeleteBodySchema } from '@/entities/mypage/model/common-schema'
import type { DeleteMyPostsResponse } from '@/entities/mypage/model/my-post-schema'
import { deleteMyPostsPostApi } from '@/entities/mypage/api/my-post-api'
import { mypageKeys } from '@/shared/api/query-keys'

export const useDeleteMyPosts = (
  options?: Omit<
    UseMutationOptions<DeleteMyPostsResponse, unknown, number[]>,
    'mutationFn'
  >
) => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (ids: number[]) => {
      const body = BulkDeleteBodySchema.parse({ ids })
      return deleteMyPostsPostApi(body)
    },
    onSuccess: async (...args) => {
      await qc.invalidateQueries({ queryKey: mypageKeys.all })
      options?.onSuccess?.(...args)
    },
    ...options,
  })
}
