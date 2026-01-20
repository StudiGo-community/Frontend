import { UserIcon } from 'lucide-react'
import Image from 'next/image'
import { formatRelativeDateTime } from '@/features/chat/lib/formatter'

interface ChatRoomItemProps {
  // TODO: API 연동할 때 조드 스키마에서 추출한 타입으로 변경
  chatRoom: {
    id: number
    name: string
    description: string
    participantCount: number
    lastMessageAt: Date
    createdAt: Date
  }
}

function ChatRoomItem({ chatRoom }: ChatRoomItemProps) {
  return (
    <li className="flex items-center">
      <div className="relative mr-4 size-25">
        <Image
          src={`/images/chat/chat-room-thumbnail-${chatRoom.id}.webp`}
          alt={`${chatRoom.name} 채팅방 썸네일`}
          className="object-cover"
          fill
        />
      </div>
      <div className="grid flex-1">
        <span className="mb-2.5 text-xl font-bold">{chatRoom.name}</span>
        <span className="text-brand-gray-400 mb-2 min-w-0 overflow-hidden text-base text-ellipsis whitespace-nowrap">
          {chatRoom.description}
        </span>
        <div className="text-brand-gray-400 flex items-center gap-1 text-xs font-semibold">
          <UserIcon size={18} strokeWidth={2.2} />
          <span>{chatRoom.participantCount} 참여중</span>
        </div>
      </div>
      <span className="text-brand-gray-400 ml-4 text-xl font-semibold">
        {formatRelativeDateTime(chatRoom.lastMessageAt)}
      </span>
    </li>
  )
}

export default ChatRoomItem
