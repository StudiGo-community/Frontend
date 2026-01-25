import { api } from '@/shared/api/client'
import {
  EmailLoginRequest,
  EmailLoginRequestSchema,
  EmailLoginResponse,
  EmailLoginResponseSchema,
} from '@/features/auth/api/schemas/login'

export const postEmailLogin = async (
  body: EmailLoginRequest
): Promise<EmailLoginResponse> => {
  const payload = EmailLoginRequestSchema.parse(body)

  const { data } = await api.post('/auth/login', payload)

  return EmailLoginResponseSchema.parse(data)
}
