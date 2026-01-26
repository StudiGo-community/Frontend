import z from 'zod'

// ---------- 채팅방 목록 조회 ----------
export const ChatRoomSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  participant_count: z.number(),
  last_message_at: z.coerce.date(),
  created_at: z.coerce.date(),
})

export const ChatRoomListResponseSchema = z
  .object({
    rooms: z.array(ChatRoomSchema),
  })
  .transform((data) => ({
    rooms: data.rooms.map((room) => ({
      id: room.id,
      name: room.name,
      description: room.description,
      participantCount: room.participant_count,
      lastMessageAt: room.last_message_at,
      createdAt: room.created_at,
    })),
  }))

export type ChatRoomListResponse = z.infer<typeof ChatRoomListResponseSchema>

export type ChatRoom = ChatRoomListResponse['rooms'][0]

// ---------- 채팅방 입장 ----------
export const ChatRoomEnterResponseSchema = z.object({
  message: z.string(),
  room: z.object({
    id: z.number(),
    name: z.string(),
  }),
})

export type ChatRoomEnterResponse = z.infer<typeof ChatRoomEnterResponseSchema>

// ---------- 채팅 메세지 조회 ----------
export const ChatMessageListRequestSchema = z.object({
  roomId: z.number(),
  size: z.number().optional(),
  cursor: z.number().optional(),
})

export type ChatMessageListRequest = z.infer<
  typeof ChatMessageListRequestSchema
>

export const ChatMessageSenderSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  profile_image_url: z.nullable(z.string()),
})

export const ChatMessageSchema = z.object({
  id: z.number(),
  sender_user_id: z.number(),
  sender: ChatMessageSenderSchema,
  content: z.string(),
  status: z.enum(['SENT', 'DELETED_BY_ADMIN']),
  created_at: z.coerce.date(),
})

export const ChatMessageListResponseSchema = z
  .object({
    room_id: z.number(),
    messages: z.array(ChatMessageSchema),
    next_cursor: z.nullable(z.number()),
    has_more: z.boolean(),
  })
  .transform((data) => ({
    roomId: data.room_id,
    messages: data.messages.map((message) => ({
      id: message.id,
      senderUserId: message.sender_user_id,
      sender: {
        id: message.sender.id,
        nickname: message.sender.nickname,
        profileImageUrl: message.sender.profile_image_url,
      },
      content: message.content,
      status: message.status,
      createdAt: message.created_at,
    })),
    nextCursor: data.next_cursor,
    hasMore: data.has_more,
  }))

export type ChatMessageListResponse = z.infer<
  typeof ChatMessageListResponseSchema
>

export type Message = ChatMessageListResponse['messages'][0]

// ---------- 실패 ----------
export const ChatErrorResponseSchema = z.object({
  detail: z.string(),
})

export type ChatErrorResponse = z.infer<typeof ChatErrorResponseSchema>
