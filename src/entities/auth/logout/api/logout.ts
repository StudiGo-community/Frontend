import { api } from '@/shared/api/client'
import {
  LogoutRequest,
  LogoutRequestSchema,
  LogoutResponse,
  LogoutResponseSchema,
} from '../model/logout-schema'

export const logout = async (
  params: Partial<LogoutRequest> = {}
): Promise<LogoutResponse> => {
  const body = LogoutRequestSchema.parse(params)

  const response = await api.post('/auth/logout', body, {
    withCredentials: true,
  })

  return LogoutResponseSchema.parse(response.data)
}
