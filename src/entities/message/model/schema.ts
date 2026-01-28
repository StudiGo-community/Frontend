import z from 'zod'

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
    id: z.number(),
    sender_user_id: z.number(),
    sender: ChatMessageSenderSchema,
    content: z.string(),
    status: z.enum(['SENT', 'DELETED_BY_ADMIN']),
    created_at: z.coerce.date(),
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
