import {
  type ChatMessageListResponse,
  type Message,
} from '@/entities/message/model/schema'
import { chatKeys } from '@/shared/api/query-keys'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

function useMessageCacheHandler() {
  const queryClient = useQueryClient()

  // NEW_MESSAGE 타입 이벤트 핸들러
  const handleNewMessage = useCallback(
    (roomId: number | null, message: Message) => {
      if (!roomId) return

      queryClient.setQueryData<InfiniteData<ChatMessageListResponse>>(
        chatKeys.messageList(roomId),
        (prev) => {
          if (!prev) return prev

          const newPages = [...prev.pages]
          const isExistMessage = newPages[0].messages.some(
            (message) => message.id === message.id
          )
          // 기존에 존재하던 메세지인지 검증 → 가장 최신 페이지에 수신한 메세지 추가
          if (isExistMessage) return prev
          newPages[0] = {
            ...newPages[0],
            messages: [message, ...newPages[0].messages],
          }

          return {
            ...prev,
            pages: newPages,
          }
        }
      )
    },
    [queryClient]
  )

  return { handleNewMessage }
}

export default useMessageCacheHandler
