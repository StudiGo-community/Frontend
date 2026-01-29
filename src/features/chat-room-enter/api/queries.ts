import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useChatStore } from '@/entities/chat-room/model/store'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
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
  'mutationFn' | 'onSuccess' | 'onError'
>

export const useEnterChatRoom = (options?: EnterChatRoomMutationOptions) => {
  const setEnteredRoomId = useChatStore((state) => state.setEnteredRoomId)
  const router = useRouter()

  return useMutation({
    mutationFn: enterChatRoom,
    onSuccess: (data) => {
      const roomId = data.room.id
      setEnteredRoomId(roomId)
      router.push(`/chat/${roomId}`)
    },
    onError: (error) => {
      toast.error(error.response?.data.detail ?? '채팅방 입장에 실패했습니다.')
    },
    ...options,
  })
}
