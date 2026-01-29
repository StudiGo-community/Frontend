import z from 'zod'

// ---------- 기본 실패 응답 ----------
export const BasicErrorResponseSchema = z.object({
  detail: z.string(),
})

export type BasicErrorResponse = z.infer<typeof BasicErrorResponseSchema>
