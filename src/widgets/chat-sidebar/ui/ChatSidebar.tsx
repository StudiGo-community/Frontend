'use client'

import { cn } from '@/shared/lib/cn'
import { UserIcon } from 'lucide-react'
import Image from 'next/image'
import { useChatStore } from '@/entities/chat-room/model/store'
import { useChatRoomList } from '@/entities/chat-room/api/queries'

function ChatSidebar() {
  const currentRoomId = useChatStore((state) => state.enteredRoomId)
  const { data } = useChatRoomList()
  const chatRooms = data?.rooms

  return (
    <aside className="border-brand-gray-200 rounded-brand-base sticky top-20 mb-8 hidden h-max w-61 shrink-0 border py-4 md:block">
      <ul className="grid gap-1">
        {chatRooms?.map((chatRoom) => (
          <li key={chatRoom.id}>
            {/*TODO: 클릭하면 다른 채팅방으로 이동하는 로직 추가*/}
            <button
              type="button"
              className={cn(
                'flex w-full items-center px-4 py-2 transition-colors',
                'hover:bg-brand-light',
                {
                  'bg-brand-side hover:bg-brand-side':
                    chatRoom.id === currentRoomId,
                }
              )}
              aria-label={`${chatRoom.name} 채팅방으로 이동 버튼`}
            >
              <div className="relative mr-2 size-10">
                <Image
                  src={`/images/chat/chat-room-thumbnail-${chatRoom.id}.webp`}
                  alt={`${chatRoom.name} 채팅방 썸네일`}
                  className="object-cover"
                  fill
                  sizes="40px"
                />
              </div>
              <div className="flex flex-1 flex-col items-start">
                <span
                  className={cn(
                    'text-brand-gray-400 mb-1 text-sm font-semibold',
                    { 'text-brand-white': chatRoom.id === currentRoomId }
                  )}
                >
                  {chatRoom.name}
                </span>
                <div
                  className={cn(
                    'text-brand-gray-200 flex items-center gap-1 text-xs font-medium',
                    { 'text-brand-white/80': chatRoom.id === currentRoomId }
                  )}
                >
                  <UserIcon size={14} strokeWidth={2} />
                  <span>{chatRoom.participantCount} 참여중</span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default ChatSidebar
