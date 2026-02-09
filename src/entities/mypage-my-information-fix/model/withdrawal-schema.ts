import { z } from 'zod'

export const WithdrawalRequestSchema = z.object({
  withdrawal_token: z.string().min(1, 'withdrawal_token은 필수입니다.'),
})

export type WithdrawalRequest = z.infer<typeof WithdrawalRequestSchema>

export const WithdrawalResponseSchema = z.object({
  detail: z.string(),
})

export type WithdrawalResponse = z.infer<typeof WithdrawalResponseSchema>

export const WithdrawalErrorResponseSchema = z.object({
  detail: z.string(),
})

export type WithdrawalErrorResponse = z.infer<
  typeof WithdrawalErrorResponseSchema
>
