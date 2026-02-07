import z from 'zod'

// ---------- 메세지 전송자 ----------
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

// ---------- 메세지 ----------
export const ChatMessageSchema = z
  .object({
    id: z.number(),
    sender_user_id: z.number(),
    sender: ChatMessageSenderSchema,
    ko_content: z.string(),
    es_content: z.string(),
    status: z.enum(['SENT', 'DELETED_BY_ADMIN']),
    created_at: z.coerce.date(),
  })
  .transform((data) => ({
    id: data.id,
    senderUserId: data.sender_user_id,
    sender: data.sender,
    koContent: data.ko_content,
    esContent: data.es_content,
    status: data.status,
    createdAt: data.created_at,
  }))

export type Message = z.infer<typeof ChatMessageSchema>

// ---------- 채팅 메세지 조회 ----------
export const ChatMessageListRequestSchema = z.object({
  roomId: z.number(),
  size: z.number().optional(),
  cursor: z.number().optional(),
})

export type ChatMessageListRequest = z.infer<
  typeof ChatMessageListRequestSchema
>

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

// 스키마 변경 대비해서 따로 관리
export const ChatMessageSendResponseSchema = ChatMessageSchema

export type ChatMessageSendResponse = z.infer<
  typeof ChatMessageSendResponseSchema
>
