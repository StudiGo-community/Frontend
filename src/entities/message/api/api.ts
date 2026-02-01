import { api } from '@/shared/api/client'
import {
  ChatMessageListResponseSchema,
  ChatMessageSendResponseSchema,
  type ChatMessageListRequest,
  type ChatMessageListResponse,
  type ChatMessageSendRequest,
  type ChatMessageSendResponse,
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

// ---------- 메세지 전송 ----------
export const sendChatMessage = async ({
  roomId,
  content,
}: ChatMessageSendRequest): Promise<ChatMessageSendResponse> => {
  const response = await api.post(`/chat/${roomId}/messages`, { content })
  return ChatMessageSendResponseSchema.parse(response.data)
}
