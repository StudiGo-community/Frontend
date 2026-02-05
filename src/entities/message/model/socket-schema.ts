import { ChatMessageSchema } from '@/entities/message/model/schema'
import z from 'zod'

export const ChatSocketEventTypeSchema = z.enum([
  'system',
  'NEW_MESSAGE',
  'MESSAGE_DELETED',
])

export type ChatSocketEventType = z.infer<typeof ChatSocketEventTypeSchema>

export const ChatSocketEventSchema = z.discriminatedUnion('type', [
  // ---------- system ----------
  z
    .object({
      type: z.literal('system'),
      room_id: z.number(),
      message: z.string(),
    })
    .transform((data) => ({
      type: data.type,
      roomId: data.room_id,
      message: data.message,
    })),
  // ---------- NEW_MESSAGE ----------
  z
    .object({ type: z.literal('NEW_MESSAGE'), message: ChatMessageSchema })
    .transform((data) => ({
      type: data.type,
      message: data.message,
    })),
  // ---------- MESSAGE_DELETED ----------
  z
    .object({
      type: z.literal('MESSAGE_DELETED'),
      room_id: z.number(),
      message_id: z.number(),
    })
    .transform((data) => ({
      type: data.type,
      roomId: data.room_id,
      messageId: data.message_id,
    })),
])

export type ChatSocketEvent = z.infer<typeof ChatSocketEventSchema>

export type ChatSocketNewMessageEvent = Extract<
  ChatSocketEvent,
  { type: 'NEW_MESSAGE' }
>

export type ChatSocketMessageDeletedEvent = Extract<
  ChatSocketEvent,
  { type: 'MESSAGE_DELETED' }
>
