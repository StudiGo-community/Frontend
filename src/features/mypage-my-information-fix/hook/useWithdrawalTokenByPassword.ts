import { useMutation } from '@tanstack/react-query'
import { postWithdrawalTokenByPasswordApi } from '@/entities/mypage-my-information-fix/api/withdrawal-token-api'
import type {
  WithdrawalTokenByPasswordRequest,
  WithdrawalTokenByPasswordResponse,
} from '@/entities/mypage-my-information-fix/model/withdrawal-token-schema'

export function useWithdrawalTokenByPassword() {
  return useMutation<
    WithdrawalTokenByPasswordResponse,
    unknown,
    WithdrawalTokenByPasswordRequest
  >({
    mutationFn: postWithdrawalTokenByPasswordApi,
  })
}
