import { useMutation } from '@tanstack/react-query'
import { changePasswordApi } from '@/entities/mypage-my-information-fix/api/profile-fix-api'
import type { ChangePasswordRequest } from '@/entities/mypage-my-information-fix/model/profile-fix-schema'

export function useChangePassword() {
  return useMutation({
    mutationFn: (requestBody: ChangePasswordRequest) =>
      changePasswordApi(requestBody),
  })
}
