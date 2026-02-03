import { ChatMessageSchema } from '@/entities/message/model/schema'
import z from 'zod'

export const ChatSocketEventTypeSchema = z.enum(['NEW_MESSAGE'])

export type ChatSocketEventType = z.infer<typeof ChatSocketEventTypeSchema>

// ---------- NEW_MESSAGE ----------
export const ChatSocketNewMessageEventSchema = z
  .object({
    type: ChatSocketEventTypeSchema,
    message: ChatMessageSchema,
  })
  .transform((data) => ({
    type: data.type,
    message: data.message,
  }))

export type ChatSocketNewMessageEvent = z.infer<
  typeof ChatSocketNewMessageEventSchema
>
