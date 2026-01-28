import { api } from '@/shared/api/client'
import {
  LogoutRequestSchema,
  LogoutResponseSchema,
  type LogoutRequest,
  type LogoutResponse,
} from '@/features/auth/api/schemas/login'

export const logout = async (
  params: Partial<LogoutRequest> = {}
): Promise<LogoutResponse> => {
  const body = LogoutRequestSchema.parse(params)

  const response = await api.post('/auth/logout', body, {
    withCredentials: true,
  })

  return LogoutResponseSchema.parse(response.data)
}
