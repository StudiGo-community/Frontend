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
