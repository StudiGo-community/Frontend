import useChatCleanup from '@/entities/chat-room/model/useChatCleanup'
import useMessageCleanup from '@/entities/message/model/useMessageCleanup'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { toast } from 'sonner'

function useExitChat() {
  const { cleanup: cleanupRoom, isExitPending } = useChatCleanup()
  const { cleanup: cleanupMessage } = useMessageCleanup()
  const router = useRouter()

  const exit = useCallback(
    async (roomId: number, redirectPath: string = '/chat') => {
      try {
        const data = await cleanupRoom(roomId)
        cleanupMessage(roomId)
        toast.success(data.message)
        router.push(redirectPath)
      } catch {
        toast.error('채팅방 퇴장에 실패했습니다.')
      }
    },
    [cleanupMessage, cleanupRoom, router]
  )

  return { exit, isExitPending }
}

export default useExitChat
