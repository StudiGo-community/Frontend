import { useMutation, useQueryClient } from '@tanstack/react-query'
import { patchProfileImageApi } from '@/entities/mypage/api/profile-api'

export const usePatchProfileImage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: patchProfileImageApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage', 'profile'] })
    },
  })
}
