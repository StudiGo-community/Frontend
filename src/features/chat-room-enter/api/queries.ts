import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { type ChatRoomEnterResponse } from '@/entities/chat-room/model/schema'
import { type BasicErrorResponse } from '@/shared/model/error-schema'
import { enterChatRoom } from '@/entities/chat-room/api/api'

// ---------- 채팅방 입장 ----------
type EnterChatRoomMutationOptions = Omit<
  UseMutationOptions<
    ChatRoomEnterResponse,
    AxiosError<BasicErrorResponse>,
    number
  >,
  'mutationFn'
>

export const useEnterChatRoom = (options?: EnterChatRoomMutationOptions) => {
  return useMutation({
    mutationFn: enterChatRoom,
    ...options,
  })
}
