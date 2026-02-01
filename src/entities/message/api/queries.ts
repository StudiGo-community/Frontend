import {
  useInfiniteQuery,
  useMutation,
  type UseInfiniteQueryOptions,
  type InfiniteData,
  type MutationOptions,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import {
  type ChatMessageListResponse,
  type ChatMessageSendRequest,
  type ChatMessageSendResponse,
} from '@/entities/message/model/schema'
import { type BasicErrorResponse } from '@/shared/model/error-schema'
import { getChatMessageList, sendChatMessage } from '@/entities/message/api/api'
import { chatKeys } from '@/shared/api/query-keys'

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

// ---------- 메세지 전송 ----------
type SendChatMessageMutationOptions = Omit<
  MutationOptions<
    ChatMessageSendResponse,
    AxiosError<BasicErrorResponse>,
    ChatMessageSendRequest
  >,
  'mutationFn'
>

export const useSendChatMessage = (
  options?: SendChatMessageMutationOptions
) => {
  return useMutation({
    mutationFn: sendChatMessage,
    ...options,
  })
}
