import { useMutation } from '@tanstack/react-query'
import { checkNicknameApi } from '@/entities/mypage-my-information-fix/api/profile-fix-api'
import type {
  CheckNicknameRequest,
  CheckNicknameResponse,
} from '@/entities/mypage-my-information-fix/model/profile-fix-schema'

export function useCheckNickname() {
  return useMutation<CheckNicknameResponse, Error, CheckNicknameRequest>({
    mutationFn: (requestBody) => checkNicknameApi(requestBody),
  })
}
