import z from 'zod'

// ---------- 채팅방 목록 조회 ----------
export const ChatRoomSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  participant_count: z.number(),
  last_message_at: z.string(),
  created_at: z.string(),
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
      lastMessageAt: new Date(room.last_message_at),
      createdAt: new Date(room.created_at),
    })),
  }))

export type ChatRoomListResponse = z.infer<typeof ChatRoomListResponseSchema>

export type ChatRoom = ChatRoomListResponse['rooms'][0]
