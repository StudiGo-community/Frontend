import z from 'zod'

// ---------- 채팅방 목록 조회 ----------
export const ChatRoomSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    participant_count: z.number(),
    last_message_at: z.coerce.date(),
    created_at: z.coerce.date(),
  })
  .transform((data) => ({
    id: data.id,
    name: data.name,
    description: data.description,
    participantCount: data.participant_count,
    lastMessageAt: data.last_message_at,
    createdAt: data.created_at,
  }))

export type ChatRoom = z.infer<typeof ChatRoomSchema>

export const ChatRoomListResponseSchema = z
  .object({
    rooms: z.array(ChatRoomSchema),
  })
  .transform((data) => ({
    rooms: data.rooms,
  }))

export type ChatRoomListResponse = z.infer<typeof ChatRoomListResponseSchema>

// ---------- 채팅방 입장 ----------
export const ChatRoomEnterResponseSchema = z.object({
  message: z.string(),
  room: z.object({
    id: z.number(),
    name: z.string(),
  }),
})

export type ChatRoomEnterResponse = z.infer<typeof ChatRoomEnterResponseSchema>
