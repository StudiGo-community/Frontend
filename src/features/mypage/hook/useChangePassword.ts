import { useMutation } from '@tanstack/react-query'
import { changePasswordApi } from '@/entities/mypage/api/profile-api'

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePasswordApi,
  })
}
