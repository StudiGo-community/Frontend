import z from 'zod'
import { TokenResponseSchema } from '@/entities/session/model/token-schema'
import { ErrorResponseSchema } from '@/shared/api/error-schema'

export const TokenRefreshRequestSchema = z.object({
  refresh_token: z.string().optional(),
})
export type TokenRefreshRequest = z.infer<typeof TokenRefreshRequestSchema>

export const TokenRefreshResponseSchema = TokenResponseSchema
export type TokenRefreshResponse = z.infer<typeof TokenRefreshResponseSchema>

export const TokenRefreshErrorSchema = ErrorResponseSchema.extend({
  error_code: z.enum([
    'INVALID_REFRESH_TOKEN',
    'REFRESH_TOKEN_EXPIRED',
    'TOKEN_REVOKED',
  ]),
})
export type TokenRefreshError = z.infer<typeof TokenRefreshErrorSchema>
