import { useCallback, useEffect } from 'react'
import { ChatSocketEventSchema } from '@/features/chat-message-subscribe/model/schema'
import useMessageCacheHandler from '@/features/chat-message-subscribe/model/useMessageCacheHandler'
import { useChatSocketStore } from '@/features/chat-message-subscribe/model/store'

function useMessageSubscribe(roomId: number | null, accessToken: string) {
  const { connect } = useChatSocketStore()
  const { handleNewMessage } = useMessageCacheHandler()

  // 수신 데이터 파싱 → 이벤트 타입에 따라 적절한 캐시 업데이트 함수 실행
  const handleSocketMessage = useCallback(
    (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data)
        const parsedData = ChatSocketEventSchema.parse(data)
        const { type, payload } = parsedData

        switch (type) {
          case 'NEW_MESSAGE':
            handleNewMessage(roomId, payload)
        }
      } catch (error) {
        console.error(`[Socket Error] 채팅방 번호: ${roomId}\n`, error)
      }
    },
    [handleNewMessage, roomId]
  )

  useEffect(() => {
    if (!roomId) return
    if (!accessToken) return

    const socket = connect(roomId, accessToken)
    socket.addEventListener('message', handleSocketMessage)

    return () => socket.removeEventListener('message', handleSocketMessage)
  }, [roomId, accessToken, connect, handleSocketMessage])
}

export default useMessageSubscribe
