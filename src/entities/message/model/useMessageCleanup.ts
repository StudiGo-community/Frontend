import { useChatSocketStore } from '@/entities/message/model/store'
import { chatKeys } from '@/shared/api/query-keys'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

function useMessageCleanup() {
  const disconnect = useChatSocketStore((state) => state.disconnect)
  const isSocketConnected = useChatSocketStore((state) => state.isConnected)
  const queryClient = useQueryClient()

  const cleanup = useCallback(
    (roomId: number) => {
      disconnect()
      queryClient.removeQueries({ queryKey: chatKeys.messageList(roomId) })
    },
    [disconnect, queryClient]
  )

  return { cleanup, isSocketConnected }
}

export default useMessageCleanup
