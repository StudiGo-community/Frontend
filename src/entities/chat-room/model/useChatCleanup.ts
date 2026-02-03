import { useExitChatRoom } from '@/entities/chat-room/api/queries'
import { useChatStore } from '@/entities/chat-room/model/store'
import { useCallback } from 'react'

function useChatCleanup() {
  const {
    mutateAsync,
    isPending: isExitPending,
    isSuccess: isExitSuccess,
  } = useExitChatRoom()
  const clearEnteredRoomId = useChatStore((state) => state.clearEnteredRoomId)

  const cleanup = useCallback(
    (roomId: number) =>
      mutateAsync(roomId, {
        onSuccess: clearEnteredRoomId,
      }),
    [clearEnteredRoomId, mutateAsync]
  )

  return { cleanup, isExitPending, isExitSuccess }
}

export default useChatCleanup
