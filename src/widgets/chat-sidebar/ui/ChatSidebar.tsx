'use client'

import { cn } from '@/shared/lib/cn'
import { UserIcon } from 'lucide-react'
import Image from 'next/image'
import { useChatRoomList } from '@/entities/chat-room/api/queries'
import Error from '@/shared/ui/Error'
import Loading from '@/shared/ui/Loading'
import { useState } from 'react'
import ChatRoomSwitchModal from '@/features/chat-room-switch/ui/ChatRoomSwitchModal'
import { type ChatRoom } from '@/entities/chat-room/model/schema'

interface ChatSidebarProps {
  enteredRoomId: number
}

function ChatSidebar({ enteredRoomId }: ChatSidebarProps) {
  const [targetRoom, setTargetRoom] = useState<ChatRoom | null>(null)
  const { data: chatRooms, isLoading, error } = useChatRoomList()

  const handleModalClose = () => setTargetRoom(null)
  const handleClick = (chatRoom: ChatRoom) => {
    if (chatRoom.id === enteredRoomId) return
    setTargetRoom(chatRoom)
  }

  return (
    <aside className="border-brand-gray-200 rounded-brand-base sticky top-20 mb-8 hidden h-max w-61 shrink-0 border py-4 md:block">
      <ul className="grid gap-1">
        {isLoading && <Loading className="py-26.5" />}
        {error && (
          <Error
            className="py-26.5"
            message={
              error.response?.data.detail ??
              '채팅방 정보를 불러오지 못했습니다.'
            }
          />
        )}
        {!isLoading && !chatRooms && (
          <Error
            className="py-26.5"
            message="채팅방 정보를 찾을 수 없습니다."
          />
        )}
        {!error &&
          chatRooms?.map((chatRoom) => (
            <li key={chatRoom.id}>
              <button
                type="button"
                className={cn(
                  'flex w-full items-center px-4 py-2 transition-colors',
                  'hover:bg-brand-light',
                  {
                    'bg-brand-side hover:bg-brand-side':
                      chatRoom.id === enteredRoomId,
                  }
                )}
                onClick={() => handleClick(chatRoom)}
                aria-label={`${chatRoom.name} 채팅방으로 이동`}
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
                      { 'text-brand-white': chatRoom.id === enteredRoomId }
                    )}
                  >
                    {chatRoom.name}
                  </span>
                  <div
                    className={cn(
                      'text-brand-gray-200 flex items-center gap-1 text-xs font-medium',
                      { 'text-brand-white/80': chatRoom.id === enteredRoomId }
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
      <ChatRoomSwitchModal targetRoom={targetRoom} onClose={handleModalClose} />
    </aside>
  )
}

export default ChatSidebar
