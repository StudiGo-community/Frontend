import { z } from 'zod'

export const TimelineHistoryItemSchema = z.object({
  date: z.string(),
  is_submitted: z.boolean(),
})

export const TimelineHistoryResponseSchema = z.object({
  results: z.array(TimelineHistoryItemSchema),
})

export type TimelineHistoryItem = z.infer<typeof TimelineHistoryItemSchema>
export type TimelineHistoryResponse = z.infer<
  typeof TimelineHistoryResponseSchema
>
