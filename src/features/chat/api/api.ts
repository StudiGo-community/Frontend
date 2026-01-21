import { api } from '@/shared/api/client'
import {
  ChatRoomListResponse,
  ChatRoomListResponseSchema,
} from '@/features/chat/model/schema'

// ---------- 채팅방 목록 조회 ----------
export const getChatRoomList = async (): Promise<ChatRoomListResponse> => {
  const response = await api.get('/chat')
  return ChatRoomListResponseSchema.parse(response.data)
}
