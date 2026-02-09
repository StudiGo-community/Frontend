import { api } from '@/shared/api/client'
import {
  WithdrawalRequestSchema,
  WithdrawalResponseSchema,
  type WithdrawalRequest,
  type WithdrawalResponse,
} from '@/entities/mypage-my-information-fix/model/withdrawal-schema'

export async function postWithdrawalApi(
  request: WithdrawalRequest
): Promise<WithdrawalResponse> {
  const validatedRequest = WithdrawalRequestSchema.parse(request)

  const response = await api.post<unknown>('/auth/withdrawal', validatedRequest)

  return WithdrawalResponseSchema.parse(response.data)
}
