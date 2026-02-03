import { Message, SendMessage } from '@/entities/message/model/schema'

export const mapSendMessageToMessage = (
  message: SendMessage,
  nickname: string,
  profileImageUrl: string | null
): Message => {
  return {
    id: message.id,
    senderUserId: message.senderId,
    sender: { id: message.senderId, nickname, profileImageUrl },
    koContent: message.content,
    esContent: message.content,
    status: message.status,
    createdAt: message.createdAt,
  }
}
