'use client'

import { EllipsisVerticalIcon, UserIcon } from 'lucide-react'
import Image from 'next/image'
import { useChatStore } from '@/features/chat/model/store'
import { useChatRoomList } from '@/features/chat/api/queries'

function ChatHeader() {
  const currentRoomId = useChatStore((state) => state.enteredRoomId)
  const { data } = useChatRoomList()
  const currentRoom = data?.rooms.find((room) => room.id === currentRoomId)

  return (
    <div className="border-b-brand-gray-200 flex max-w-239 items-center border-b py-2.5">
      <div className="relative mr-3 size-19">
        <Image
          src={`/images/chat/chat-room-thumbnail-${currentRoom?.id}.webp`}
          alt={`${currentRoom?.name} 채팅방 썸네일`}
          className="object-cover"
          fill
          sizes="76px"
        />
      </div>
      <div className="flex flex-1 flex-col items-start">
        <span className="mb-1 text-4xl font-medium">{currentRoom?.name}</span>
        <div className="text-brand-gray-300 flex items-center gap-1 text-xl font-semibold">
          <UserIcon size={20} strokeWidth={2.8} />
          <span>{currentRoom?.participantCount} 참여중</span>
        </div>
      </div>
      {/* TODO: 채팅방 퇴장 API 연결할 때 클릭하면 메뉴 나오게 만들기 */}
      <button type="button" className="p-2">
        <EllipsisVerticalIcon className="text-brand-gray-400" size={30} />
      </button>
    </div>
  )
}

export default ChatHeader
