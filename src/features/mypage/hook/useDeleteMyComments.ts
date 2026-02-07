import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query'
import { BulkDeleteBodySchema } from '@/entities/mypage/model/common-schema'
import type { DeleteMyCommentsResponse } from '@/entities/mypage/model/my-comments-schema'
import { deleteMyCommentsPostApi } from '@/entities/mypage/api/my-comments-api'
import { mypageKeys } from '@/shared/api/query-keys'

export const useDeleteMyComments = (
  options?: Omit<
    UseMutationOptions<DeleteMyCommentsResponse, unknown, number[]>,
    'mutationFn'
  >
) => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (ids: number[]) => {
      const body = BulkDeleteBodySchema.parse({ ids })
      return deleteMyCommentsPostApi(body)
    },
    onSuccess: async (...args) => {
      await qc.invalidateQueries({ queryKey: mypageKeys.all })
      options?.onSuccess?.(...args)
    },
    ...options,
  })
}
