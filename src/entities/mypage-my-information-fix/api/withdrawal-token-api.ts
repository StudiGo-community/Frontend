import { api } from '@/shared/api/client'
import {
  WithdrawalTokenStepSchema,
  WithdrawalTokenByPasswordRequestSchema,
  WithdrawalTokenByPasswordResponseSchema,
  type WithdrawalTokenStep,
  type WithdrawalTokenByPasswordRequest,
  type WithdrawalTokenByPasswordResponse,
} from '@/entities/mypage-my-information-fix/model/withdrawal-token-schema'

export async function getWithdrawalTokenStepApi(): Promise<WithdrawalTokenStep> {
  const response = await api.get<unknown>('/auth/withdrawal-token')
  return WithdrawalTokenStepSchema.parse(response.data)
}

export async function postWithdrawalTokenByPasswordApi(
  request: WithdrawalTokenByPasswordRequest
): Promise<WithdrawalTokenByPasswordResponse> {
  const validated = WithdrawalTokenByPasswordRequestSchema.parse(request)
  const response = await api.post<unknown>(
    '/auth/withdrawal-token/password',
    validated
  )
  return WithdrawalTokenByPasswordResponseSchema.parse(response.data)
}
