import { api } from '@/shared/api/client'
import {
  EmailLoginRequest,
  EmailLoginRequestSchema,
  TokenResponse,
  TokenResponseSchema,
} from '@/features/auth/api/schemas/login'

export const postEmailLogin = async (
  body: EmailLoginRequest
): Promise<TokenResponse> => {
  const payload = EmailLoginRequestSchema.parse(body)

  const { data } = await api.post('/api/v1/auth/login', payload)

  return TokenResponseSchema.parse(data)
}
