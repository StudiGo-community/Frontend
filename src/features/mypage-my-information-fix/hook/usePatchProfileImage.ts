import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mypageKeys } from '@/shared/api/query-keys'
import { patchProfileImageApi } from '@/entities/mypage-my-information-fix/api/profile-fix-api'
import type { PatchProfileImageRequest } from '@/entities/mypage-my-information-fix/model/profile-fix-schema'

export function usePatchProfileImage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (requestBody: PatchProfileImageRequest) =>
      patchProfileImageApi(requestBody),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: mypageKeys.profile() })
    },
  })
}
