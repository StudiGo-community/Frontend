import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProfileImageApi } from '@/entities/mypage/api/profile-api'

export const useDeleteProfileImage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProfileImageApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage', 'profile'] })
    },
  })
}
