import z from 'zod'

export const ErrorResponseSchema = z.object({
  error_code: z.string(),
  error_detail: z.string(),
})

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>
