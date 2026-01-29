import {
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
  type InfiniteData,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { type ChatMessageListResponse } from '@/entities/message/model/schema'
import { type BasicErrorResponse } from '@/shared/model/error-schema'
import { getChatMessageList } from '@/entities/message/api/api'
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
