import { ChatMessageSchema } from '@/entities/message/model/schema'
import z from 'zod'

export const ChatSocketEventTypeSchema = z.enum([
  'NEW_MESSAGE',
  'MESSAGE_DELETED',
])

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

// ---------- MESSAGE_DELETED ----------
export const ChatSocketMessageDeletedEventSchema = z
  .object({
    type: ChatSocketEventTypeSchema,
    room_id: z.number(),
    message_id: z.number(),
  })
  .transform((data) => ({
    type: data.type,
    roomId: data.room_id,
    messageId: data.message_id,
  }))

export type ChatSocketMessageDeletedEvent = z.infer<
  typeof ChatSocketMessageDeletedEventSchema
>
