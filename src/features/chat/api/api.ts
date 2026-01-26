import { api } from '@/shared/api/client'
import {
  ChatRoomListResponseSchema,
  ChatMessageListResponseSchema,
  type ChatRoomListResponse,
  type ChatRoomEnterResponse,
  type ChatMessageListResponse,
  type ChatMessageListRequest,
} from '@/features/chat/model/schema'

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

// ---------- 채팅 메세지 조회 ----------
export const getChatMessageList = async ({
  roomId,
  size = 20,
  cursor,
}: ChatMessageListRequest): Promise<ChatMessageListResponse> => {
  const response = await api.get(`/chat/${roomId}/messages`, {
    params: { cursor, size },
  })
  return ChatMessageListResponseSchema.parse(response.data)
}
