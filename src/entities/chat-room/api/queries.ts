import {
  useQuery,
  useMutation,
  type UseQueryOptions,
  type UseMutationOptions,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import {
  type ChatRoomListResponse,
  type ChatRoomEnterResponse,
  type ChatRoomExitResponse,
} from '@/entities/chat-room/model/schema'
import { type BasicErrorResponse } from '@/shared/model/error-schema'
import {
  getChatRoomList,
  enterChatRoom,
  exitChatRoom,
} from '@/entities/chat-room/api/api'
import { chatKeys } from '@/shared/api/query-keys'

// ---------- 채팅방 목록 조회 ----------
type ChatRoomListQueryOptions = Omit<
  UseQueryOptions<ChatRoomListResponse, AxiosError<BasicErrorResponse>>,
  'queryKey' | 'queryFn'
>

export const useChatRoomList = (
  sort: string = 'desc',
  options?: ChatRoomListQueryOptions
) => {
  return useQuery({
    queryKey: chatKeys.roomList(sort),
    queryFn: () => getChatRoomList(sort),
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
  'mutationFn'
>

export const useEnterChatRoom = (options?: EnterChatRoomMutationOptions) => {
  return useMutation({
    mutationFn: enterChatRoom,
    ...options,
  })
}

// ---------- 채팅방 퇴장 ----------
type ExitChatRoomMutationOptions = Omit<
  UseMutationOptions<
    ChatRoomExitResponse,
    AxiosError<BasicErrorResponse>,
    number
  >,
  'mutationFn'
>

export const useExitChatRoom = (options?: ExitChatRoomMutationOptions) => {
  return useMutation({
    mutationFn: exitChatRoom,
    ...options,
  })
}
