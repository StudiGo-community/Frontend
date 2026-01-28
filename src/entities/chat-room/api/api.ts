import { api } from '@/shared/api/client'
import {
  ChatRoomListResponseSchema,
  type ChatRoomListResponse,
  type ChatRoomEnterResponse,
} from '@/entities/chat-room/model/schema'

// ---------- 채팅방 목록 조회 ----------
export const getChatRoomList = async (): Promise<ChatRoomListResponse> => {
  const response = await api.get('/chat')
  return ChatRoomListResponseSchema.parse(response.data)
}

// ---------- 채팅방 입장 ----------
export const enterChatRoom = async (
  roomId: number
): Promise<ChatRoomEnterResponse> => {
  const response = await api.post(`/chat/${roomId}`)
  return response.data
}
