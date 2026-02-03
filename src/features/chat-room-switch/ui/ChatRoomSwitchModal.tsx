import { type ChatRoom } from '@/entities/chat-room/model/schema'
import { useChatStore } from '@/entities/chat-room/model/store'
import { cn } from '@/shared/lib/cn'
import { Button, ButtonVariants } from '@/shared/ui/Button'
import { Modal, ModalClose } from '@/shared/ui/Modal'
import useSwitchChat from '@/features/chat-room-switch/lib/useSwitchChat'

interface ChatRoomSwitchModalProps {
  targetRoom: ChatRoom | null
  onClose: () => void
}

function ChatRoomSwitchModal({
  targetRoom,
  onClose,
}: ChatRoomSwitchModalProps) {
  const enteredRoomId = useChatStore((state) => state.enteredRoomId)
  const { switchRoom, isSwitchPending } = useSwitchChat()

  if (!targetRoom || !enteredRoomId) return
  return (
    <Modal
      title="알림"
      isOpen={!!targetRoom}
      onClose={onClose}
      size="sm"
      contentClassName="flex flex-col items-center"
    >
      <span className="mb-0.5 text-center text-lg font-semibold break-keep">
        <strong className="text-brand-main mr-1 font-bold underline">
          {targetRoom.name}
        </strong>
        에 입장하시겠습니까?
      </span>
      <span className="text-brand-gray-500 mb-8 text-sm font-medium">
        입장 시 현재 이용 중인 채팅방에서 퇴장 처리됩니다.
      </span>
      <div className="flex gap-2">
        <ModalClose
          className={cn(
            ButtonVariants({ variant: 'outline', size: 'md' }),
            'px-10'
          )}
          disabled={isSwitchPending}
        >
          취소
        </ModalClose>
        <Button
          size="md"
          className="px-10"
          onClick={() => switchRoom(enteredRoomId, targetRoom.id)}
          disabled={isSwitchPending}
        >
          확인
        </Button>
      </div>
    </Modal>
  )
}

export default ChatRoomSwitchModal
