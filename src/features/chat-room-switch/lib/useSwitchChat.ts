import { useEnterChatRoom } from '@/entities/chat-room/api/queries'
import useChatCleanup from '@/entities/chat-room/model/useChatCleanup'
import useMessageCleanup from '@/entities/message/model/useMessageCleanup'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { toast } from 'sonner'

const LOADING_TOAST_ID = 'ENTER_ROOM'

function useSwitchChat() {
  const { cleanup: cleanupRoom, isExitPending } = useChatCleanup()
  const { cleanup: cleanupMessage } = useMessageCleanup()
  const { mutate: enterChat, isPending: isEnterPending } = useEnterChatRoom()
  const router = useRouter()
  const isSwitchPending = isExitPending || isEnterPending

  const switchRoom = useCallback(
    async (currentRoomId: number, targetRoomId: number) => {
      // 현재 채팅방 퇴장
      try {
        await cleanupRoom(currentRoomId)
        cleanupMessage(currentRoomId)
      } catch {
        toast.error('채팅방 퇴장에 실패했습니다.')
        return
      }

      // 새로운 채팅방 입장
      toast.loading('채팅방 입장 중...', { id: LOADING_TOAST_ID })
      enterChat(targetRoomId, {
        onSuccess: () => {
          toast.success('환영합니다!', { id: LOADING_TOAST_ID })
          router.push(`/chat/${targetRoomId}`)
        },
        onError: (error) =>
          toast.error(
            error.response?.data.detail ?? '채팅방 입장에 실패했습니다.',
            { id: LOADING_TOAST_ID }
          ),
      })
    },
    [cleanupMessage, cleanupRoom, enterChat, router]
  )

  return { switchRoom, isSwitchPending }
}

export default useSwitchChat
