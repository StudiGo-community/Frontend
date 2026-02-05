import { useMutation, useQueryClient } from '@tanstack/react-query'
import { patchMyProfileApi } from '@/entities/mypage/api/profile-api'

export const usePatchMyProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: patchMyProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage', 'profile'] })
    },
  })
}
