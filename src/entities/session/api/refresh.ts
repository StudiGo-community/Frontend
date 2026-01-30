import { api } from '@/shared/api/client'
import {
  TokenRefreshRequest,
  TokenRefreshRequestSchema,
  TokenRefreshResponse,
  TokenRefreshResponseSchema,
} from '@/entities/session/model/refresh-schema'

export const postTokenRefresh = async (
  body?: TokenRefreshRequest
): Promise<TokenRefreshResponse> => {
  const payload = TokenRefreshRequestSchema.parse(body ?? {})

  const { data } = await api.post('/auth/refresh', payload, {
    withCredentials: true,
  })

  return TokenRefreshResponseSchema.parse(data)
}
