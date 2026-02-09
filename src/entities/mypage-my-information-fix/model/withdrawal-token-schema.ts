import { z } from 'zod'

export const WithdrawalTokenStepSchema = z.union([
  z.object({
    next_step: z.literal('password'),
  }),
  z.object({
    next_step: z.literal('social'),
    providers: z.array(z.enum(['google', 'kakao'])),
  }),
])

export type WithdrawalTokenStep = z.infer<typeof WithdrawalTokenStepSchema>

export const WithdrawalTokenByPasswordRequestSchema = z.object({
  password: z.string().min(1, 'password는 필수입니다.'),
})

export type WithdrawalTokenByPasswordRequest = z.infer<
  typeof WithdrawalTokenByPasswordRequestSchema
>

export const WithdrawalTokenByPasswordResponseSchema = z.object({
  withdrawal_token: z.string(),
  expires_in: z.number().int(),
})

export type WithdrawalTokenByPasswordResponse = z.infer<
  typeof WithdrawalTokenByPasswordResponseSchema
>

export const WithdrawalTokenErrorResponseSchema = z.object({
  detail: z.string(),
})

export type WithdrawalTokenErrorResponse = z.infer<
  typeof WithdrawalTokenErrorResponseSchema
>
