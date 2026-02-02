import { api } from '@/shared/api/client'
import {
  SignupRequestSchema,
  type SignupRequest,
  SignupResponseSchema,
  type SignupResponse,
} from '@/features/auth-join/model/signup-schema'

export type SignupGender = 'M' | 'F'

export async function signupEmail(
  payload: SignupRequest
): Promise<SignupResponse> {
  const body = SignupRequestSchema.parse(payload)
  const res = await api.post('/auth/signup', body) // ✅ 필요시 '/auth/signup/email' 로 변경
  return SignupResponseSchema.parse(res.data)
}
