import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mypageKeys } from '@/shared/api/query-keys'
import { patchMyProfileApi } from '@/entities/mypage-my-information-fix/api/profile-fix-api'
import type { PatchMyProfileRequest } from '@/entities/mypage-my-information-fix/model/profile-fix-schema'

export function usePatchMyProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (requestBody: PatchMyProfileRequest) =>
      patchMyProfileApi(requestBody),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: mypageKeys.profile() })
    },
  })
}
