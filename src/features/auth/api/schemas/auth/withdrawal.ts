import z from 'zod'

export const WithdrawalInfoResponseSchema = z.object({
  user_info: z.record(z.string(), z.unknown()),
})

export type WithdrawalInfoResponse = z.infer<
  typeof WithdrawalInfoResponseSchema
>
