'use client'

import { ChatRoomSchema } from '@/entities/chat-room/model/schema'
import MessageInput from '@/features/chat-message-send/ui/MessageInput'
import { CHAT_ROOMS } from '@/shared/api/mocks/data/chat-data'
import { cn } from '@/shared/lib/cn'
import { ButtonVariants } from '@/shared/ui/Button'
import { ChatMessageView } from '@/features/chat-message-view/ui'
import Link from 'next/link'

// TODO: 실제 데이터로 교체하기
const currentChatRoom = ChatRoomSchema.parse(CHAT_ROOMS[1])

function ChatPopover() {
  return (
    <div className="shadow-brand-sm rounded-brand-base bg-brand-white flex h-3/4 max-h-124 w-7/8 max-w-138 min-w-100 flex-col border p-4">
      {/* 채팅방 헤더 */}
      <div className="border-b-brand-gray-200 flex items-center justify-between border-b px-2 pt-1.5 pb-3">
        <span className="text-2xl font-semibold">{currentChatRoom.name}</span>
        <Link
          href={`/chat/${currentChatRoom.id}`}
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
        enteredRoomId={currentChatRoom.id}
        className="flex h-max grow-2 flex-col overflow-y-auto"
      />

      {/* 메세지 전송 폼 */}
      <MessageInput enteredRoomId={currentChatRoom.id} className="grow gap-2" />
    </div>
  )
}

export default ChatPopover
