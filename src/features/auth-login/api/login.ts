import { AxiosError } from 'axios'
import { api } from '@/shared/api/client'

import {
  EmailLoginRequest,
  EmailLoginRequestSchema,
  EmailLoginResponse,
  EmailLoginResponseSchema,
} from '@/features/auth-login/model/login-schema'

function unwrapResponseData(input: unknown): unknown {
  if (typeof input !== 'object' || input === null) return input

  if ('data' in input) return (input as { data: unknown }).data
  if ('result' in input) return (input as { result: unknown }).result
  if ('response' in input) return (input as { response: unknown }).response

  return input
}

export const postEmailLogin = async (
  body: EmailLoginRequest
): Promise<EmailLoginResponse> => {
  const payload = EmailLoginRequestSchema.parse(body)

  const res = await api.post('/auth/login', payload, {
    withCredentials: true,
    validateStatus: () => true,
  })

  if (res.status < 200 || res.status >= 300) {
    throw new AxiosError(
      `Request failed with status code ${res.status}`,
      String(res.status),
      res.config,
      res.request,
      res
    )
  }

  const unwrapped = unwrapResponseData(res.data)
  return EmailLoginResponseSchema.parse(unwrapped)
}
