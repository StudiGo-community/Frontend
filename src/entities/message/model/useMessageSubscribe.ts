import { useCallback, useEffect } from 'react'
import { ChatSocketEventSchema } from '@/entities/message/model/socket-schema'
import useMessageCacheHandler from '@/entities/message/model/useMessageCacheHandler'
import { useChatSocketStore } from '@/entities/message/model/store'

function useMessageSubscribe(
  roomId: number | null,
  accessToken: string | null
) {
  const connect = useChatSocketStore((state) => state.connect)
  const { handleNewMessage, handleMessageDeleted } = useMessageCacheHandler()

  // 수신 데이터 파싱 → 이벤트 타입에 따라 적절한 캐시 업데이트 함수 실행
  const handleSocketMessage = useCallback(
    (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data)
        const parsedData = ChatSocketEventSchema.parse(data)
        const { type } = parsedData

        switch (type) {
          case 'NEW_MESSAGE':
            handleNewMessage(roomId, parsedData.message)
            break
          case 'MESSAGE_DELETED':
            handleMessageDeleted(roomId, parsedData.messageId)
            break
          default:
            console.log(
              `[${type}]\n${Object.entries(data)
                .map((item) => item.join(': '))
                .join('\n')}`
            )
            return
        }
      } catch (error) {
        console.error(`[Socket Error] 채팅방 번호: ${roomId}\n`, error)
      }
    },
    [handleMessageDeleted, handleNewMessage, roomId]
  )

  useEffect(() => {
    if (!roomId || !accessToken) return

    const socket = connect(roomId, accessToken)
    socket.addEventListener('message', handleSocketMessage)

    return () => socket.removeEventListener('message', handleSocketMessage)
  }, [roomId, accessToken, connect, handleSocketMessage])
}

export default useMessageSubscribe
