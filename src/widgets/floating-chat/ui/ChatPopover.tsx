'use client'

import { type ChatRoom } from '@/entities/chat-room/model/schema'
import MessageInput from '@/features/chat-message-send/ui/MessageInput'
import { cn } from '@/shared/lib/cn'
import { ButtonVariants } from '@/shared/ui/Button'
import { ChatMessageView } from '@/features/chat-message-view/ui'
import Link from 'next/link'

interface ChatPopoverProps {
  chatRoom: ChatRoom
}

function ChatPopover({ chatRoom }: ChatPopoverProps) {
  return (
    <div className="shadow-brand-sm rounded-brand-base bg-brand-white flex h-3/4 max-h-124 w-7/8 max-w-138 min-w-100 flex-col border p-4">
      {/* 채팅방 헤더 */}
      <div className="border-b-brand-gray-200 flex items-center justify-between border-b px-2 pt-1.5 pb-3">
        <span className="text-2xl font-semibold">{chatRoom.name}</span>
        <Link
          href={`/chat/${chatRoom.id}`}
          className={cn(
            ButtonVariants({ variant: 'secondary', size: 'sm' }),
            'h-max px-3 py-1 text-sm'
          )}
        >
          채팅방으로
        </Link>
      </div>

      {/* 메세지 리스트 */}
      <ChatMessageView
        enteredRoomId={chatRoom.id}
        className="flex h-max grow-2 flex-col overflow-y-auto"
      />

      {/* 메세지 전송 폼 */}
      <MessageInput enteredRoomId={chatRoom.id} className="grow gap-2" />
    </div>
  )
}

export default ChatPopover
