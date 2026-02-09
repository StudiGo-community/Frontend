import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mypageKeys } from '@/shared/api/query-keys'
import { patchMyProfileApi } from '@/entities/mypage-my-information-fix/api/profile-fix-api'
import type {
  PatchMyProfileRequest,
  PatchMyProfileResponse,
} from '@/entities/mypage-my-information-fix/model/profile-fix-schema'
import { useSessionStore } from '@/entities/session/store/session-store'

export function usePatchMyProfile() {
  const queryClient = useQueryClient()

  return useMutation<PatchMyProfileResponse, Error, PatchMyProfileRequest>({
    mutationFn: (requestBody) => patchMyProfileApi(requestBody),

    onSuccess: async (data) => {
      const { user: currentUser } = useSessionStore.getState()

      if (currentUser) {
        useSessionStore.getState().setUser({
          ...currentUser,
          nickname: data.user.nickname,
        })
      }

      await queryClient.invalidateQueries({ queryKey: mypageKeys.profile() })
    },
  })
}
