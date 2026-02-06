'use client'

import { useState } from 'react'
import ChatPopover from '@/widgets/floating-chat/ui/ChatPopover'
import { Button } from '@/shared/ui/Button'
import { MessageSquareTextIcon } from 'lucide-react'
import { useChatRoomList } from '@/entities/chat-room/api/queries'
import { useChatStore } from '@/entities/chat-room/model/store'

function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const enteredRoomId = useChatStore((state) => state.enteredRoomId)
  const { data } = useChatRoomList()
  const currentChatRoom = data?.rooms.find((room) => room.id === enteredRoomId)

  const handleClick = () => setIsOpen((prev) => !prev)

  if (!currentChatRoom) return
  return (
    <section className="fixed right-10 bottom-10 z-50 flex origin-bottom-right flex-col items-end gap-4 transition-all duration-300">
      {/* 채팅 팝오버 */}
      {isOpen && <ChatPopover chatRoom={currentChatRoom} />}

      {/* 채팅 팝오버 트리거 버튼 */}
      <Button
        className="bg-brand-third hover:bg-brand-second h-max rounded-full p-4 font-bold text-white"
        onClick={handleClick}
        aria-label={isOpen ? '채팅방 닫기' : '채팅방 열기'}
      >
        <MessageSquareTextIcon className="size-8" />
      </Button>
    </section>
  )
}

export default FloatingChat
