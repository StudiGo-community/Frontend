import {
  useQuery,
  useMutation,
  type UseQueryOptions,
  type UseMutationOptions,
} from '@tanstack/react-query'
import {
  type ChatRoomListResponse,
  type ChatRoomEnterResponse,
  type ChatErrorResponse,
} from '@/features/chat/model/schema'
import { queryKeys } from '@/features/chat/api/query-keys'
import { enterChatRoom, getChatRoomList } from '@/features/chat/api/api'
import { AxiosError } from 'axios'
import { useChatStore } from '@/features/chat/model/store'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

// ---------- 채팅방 목록 조회 ----------
type ChatRoomListQueryOptions = Omit<
  UseQueryOptions<ChatRoomListResponse, AxiosError<ChatErrorResponse>>,
  'queryKey' | 'queryFn'
>

export const useChatRoomList = (options?: ChatRoomListQueryOptions) => {
  return useQuery({
    queryKey: queryKeys.roomList(),
    queryFn: getChatRoomList,
    ...options,
  })
}

// ---------- 채팅방 입장 ----------
type EnterChatRoomMutationOptions = Omit<
  UseMutationOptions<
    ChatRoomEnterResponse,
    AxiosError<ChatErrorResponse>,
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
