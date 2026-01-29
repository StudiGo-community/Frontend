import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { type ChatRoomListResponse } from '@/entities/chat-room/model/schema'
import { type BasicErrorResponse } from '@/shared/model/error-schema'
import { getChatRoomList } from '@/entities/chat-room/api/api'
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
