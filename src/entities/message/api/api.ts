import { api } from '@/shared/api/client'
import {
  ChatMessageListResponseSchema,
  type ChatMessageListRequest,
  type ChatMessageListResponse,
} from '@/entities/message/model/schema'

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
