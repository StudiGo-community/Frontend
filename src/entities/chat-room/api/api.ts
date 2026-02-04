import { api } from '@/shared/api/client'
import {
  ChatRoomListResponseSchema,
  ChatRoomEnterResponseSchema,
  ChatRoomExitResponseSchema,
  type ChatRoomListResponse,
  type ChatRoomEnterResponse,
  type ChatRoomExitResponse,
} from '@/entities/chat-room/model/schema'

// ---------- 채팅방 목록 조회 ----------
export const getChatRoomList = async (
  sort: string
): Promise<ChatRoomListResponse> => {
  const response = await api.get('/chat', { params: { sort } })
  return ChatRoomListResponseSchema.parse(response.data)
}

// ---------- 채팅방 입장 ----------
export const enterChatRoom = async (
  roomId: number
): Promise<ChatRoomEnterResponse> => {
  const response = await api.post(`/chat/${roomId}`)
  return ChatRoomEnterResponseSchema.parse(response.data)
}

// ---------- 채팅방 퇴장 ----------
export const exitChatRoom = async (
  roomId: number
): Promise<ChatRoomExitResponse> => {
  const response = await api.post(`/chat/${roomId}/exit`)
  return ChatRoomExitResponseSchema.parse(response.data)
}
