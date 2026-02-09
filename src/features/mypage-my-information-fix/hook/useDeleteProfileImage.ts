import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mypageKeys } from '@/shared/api/query-keys'
import { deleteProfileImageApi } from '@/entities/mypage-my-information-fix/api/profile-fix-api'

export function useDeleteProfileImage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteProfileImageApi(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: mypageKeys.profile() })
    },
  })
}
