import { api } from '@/shared/api/client'
import {
  TokenRefreshRequest,
  TokenRefreshRequestSchema,
  TokenRefreshResponse,
  TokenRefreshResponseSchema,
} from '@/features/auth/api/schemas/login/refresh'

export const postTokenRefresh = async (
  body?: TokenRefreshRequest
): Promise<TokenRefreshResponse> => {
  const payload = TokenRefreshRequestSchema.parse(body ?? {})

  const { data } = await api.post('/api/v1/auth/refresh', payload, {
    withCredentials: true,
  })

  return TokenRefreshResponseSchema.parse(data)
}
