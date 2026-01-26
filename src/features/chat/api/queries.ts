import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  type UseQueryOptions,
  type UseMutationOptions,
  type UseInfiniteQueryOptions,
  type InfiniteData,
} from '@tanstack/react-query'
import {
  type ChatRoomListResponse,
  type ChatRoomEnterResponse,
  type ChatErrorResponse,
  type ChatMessageListResponse,
} from '@/features/chat/model/schema'
import { queryKeys } from '@/features/chat/api/query-keys'
import {
  enterChatRoom,
  getChatMessageList,
  getChatRoomList,
} from '@/features/chat/api/api'
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

// ---------- 채팅 메세지 조회 ----------
type ChatMessageListQueryOptions = Omit<
  UseInfiniteQueryOptions<
    ChatMessageListResponse,
    AxiosError<ChatErrorResponse>,
    InfiniteData<ChatMessageListResponse>
  >,
  'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam' | 'enabled'
>

export const useChatMessageList = (
  roomId: number | null,
  options?: ChatMessageListQueryOptions
) => {
  return useInfiniteQuery({
    queryKey: queryKeys.messageList(roomId ?? -1),
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
