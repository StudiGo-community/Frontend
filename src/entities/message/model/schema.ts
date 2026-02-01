import z from 'zod'

// ---------- 베이스 ----------
const ChatMessageBaseSchema = z.object({
  id: z.number(),
  content: z.string(),
  status: z.enum(['SENT', 'DELETED_BY_ADMIN']),
  created_at: z.coerce.date(),
})

// ---------- 채팅 메세지 조회 ----------
export const ChatMessageListRequestSchema = z.object({
  roomId: z.number(),
  size: z.number().optional(),
  cursor: z.number().optional(),
})

export type ChatMessageListRequest = z.infer<
  typeof ChatMessageListRequestSchema
>

export const ChatMessageSenderSchema = z
  .object({
    id: z.number(),
    nickname: z.string(),
    profile_image_url: z.nullable(z.string()),
  })
  .transform((data) => ({
    id: data.id,
    nickname: data.nickname,
    profileImageUrl: data.profile_image_url,
  }))

export type MessageSender = z.infer<typeof ChatMessageSenderSchema>

export const ChatMessageSchema = z
  .object({
    ...ChatMessageBaseSchema.shape,
    sender_user_id: z.number(),
    sender: ChatMessageSenderSchema,
  })
  .transform((data) => ({
    id: data.id,
    senderUserId: data.sender_user_id,
    sender: data.sender,
    content: data.content,
    status: data.status,
    createdAt: data.created_at,
  }))

export type Message = z.infer<typeof ChatMessageSchema>

export const ChatMessageListResponseSchema = z
  .object({
    room_id: z.number(),
    messages: z.array(ChatMessageSchema),
    next_cursor: z.nullable(z.number()),
    has_more: z.boolean(),
  })
  .transform((data) => ({
    roomId: data.room_id,
    messages: data.messages,
    nextCursor: data.next_cursor,
    hasMore: data.has_more,
  }))

export type ChatMessageListResponse = z.infer<
  typeof ChatMessageListResponseSchema
>

// ---------- 메세지 전송 ----------
export const ChatMessageSendRequestSchema = z.object({
  roomId: z.number(),
  content: z.string(),
})

export type ChatMessageSendRequest = z.infer<
  typeof ChatMessageSendRequestSchema
>

export const ChatSendMessageSchema = z
  .object({
    ...ChatMessageBaseSchema.shape,
    room_id: z.number(),
    sender_id: z.number(),
  })
  .transform((data) => ({
    id: data.id,
    roomId: data.room_id,
    senderId: data.sender_id,
    content: data.content,
    status: data.status,
    createdAt: data.created_at,
  }))

export type SendMessage = z.infer<typeof ChatSendMessageSchema>

export const ChatMessageSendResponseSchema = z
  .object({
    message: ChatSendMessageSchema,
  })
  .transform((data) => ({
    message: data.message,
  }))

export type ChatMessageSendResponse = z.infer<
  typeof ChatMessageSendResponseSchema
>
