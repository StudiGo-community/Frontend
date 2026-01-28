import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  type UseQueryOptions,
  type UseMutationOptions,
  type UseInfiniteQueryOptions,
  type InfiniteData,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useChatStore } from '@/features/chat/model/store'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
  type ChatRoomEnterResponse,
  type ChatRoomListResponse,
} from '@/entities/chat-room/model/schema'
import { type ChatMessageListResponse } from '@/entities/message/model/schema'
import { type BasicErrorResponse } from '@/shared/model/error-schema'
import { enterChatRoom, getChatRoomList } from '@/entities/chat-room/api/api'
import { getChatMessageList } from '@/entities/message/api/api'
import { chatKeys } from '@/shared/api/query-keys'

// ---------- 채팅방 목록 조회 ----------
type ChatRoomListQueryOptions = Omit<
  UseQueryOptions<ChatRoomListResponse, AxiosError<BasicErrorResponse>>,
  'queryKey' | 'queryFn'
>

export const useChatRoomList = (options?: ChatRoomListQueryOptions) => {
  return useQuery({
    queryKey: chatKeys.roomList(),
    queryFn: getChatRoomList,
    ...options,
  })
}

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

// ---------- 채팅 메세지 조회 ----------
type ChatMessageListQueryOptions = Omit<
  UseInfiniteQueryOptions<
    ChatMessageListResponse,
    AxiosError<BasicErrorResponse>,
    InfiniteData<ChatMessageListResponse>
  >,
  'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam' | 'enabled'
>

export const useChatMessageList = (
  roomId: number | null,
  options?: ChatMessageListQueryOptions
) => {
  return useInfiniteQuery({
    queryKey: chatKeys.messageList(roomId ?? -1),
    queryFn: ({ pageParam }) =>
      getChatMessageList({
        roomId: roomId ?? -1,
        cursor: pageParam as number | undefined,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    enabled: !!roomId,
    ...options,
  })
}
