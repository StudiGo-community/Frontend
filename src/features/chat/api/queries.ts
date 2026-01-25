import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import {
  type ChatRoomListResponse,
  type ChatErrorResponse,
} from '@/features/chat/model/schema'
import { queryKeys } from '@/features/chat/api/query-keys'
import { getChatRoomList } from '@/features/chat/api/api'
import { AxiosError } from 'axios'

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
