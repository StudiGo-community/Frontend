import { ChatMessageSchema } from '@/entities/message/model/schema'
import z from 'zod'

export const ChatSocketEventTypeSchema = z.enum(['NEW_MESSAGE'])

export type ChatSocketEventType = z.infer<typeof ChatSocketEventTypeSchema>

export const ChatSocketEventSchema = z
  .object({
    type: ChatSocketEventTypeSchema,
    payload: ChatMessageSchema,
  })
  .transform((data) => ({
    type: data.type,
    payload: data.payload,
  }))

export type ChatSocketEvent = z.infer<typeof ChatSocketEventSchema>
