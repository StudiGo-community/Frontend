import { useMutation } from '@tanstack/react-query'
import { postWithdrawalApi } from '@/entities/mypage-my-information-fix/api/withdrawal-api'
import type {
  WithdrawalRequest,
  WithdrawalResponse,
} from '@/entities/mypage-my-information-fix/model/withdrawal-schema'
export function useWithdrawal() {
  return useMutation<WithdrawalResponse, unknown, WithdrawalRequest>({
    mutationFn: postWithdrawalApi,
  })
}
