import { api } from '@/shared/api/client'
import {
  SignupRequestSchema,
  type SignupRequest,
  SignupResponseSchema,
  type SignupResponse,
} from '@/features/auth-join/model/signup-schema'

export type SignupGender = 'M' | 'F'
export type SignupEmailRequest = SignupRequest

export const signupEmail = async (
  payload: SignupRequest
): Promise<SignupResponse | unknown> => {
  const body = SignupRequestSchema.parse(payload)

  const res = await api.post('/auth/signup/email', body)

  const parsed = SignupResponseSchema.safeParse(res.data)
  return parsed.success ? parsed.data : res.data
}
