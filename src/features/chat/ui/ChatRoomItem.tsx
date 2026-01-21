import { UserIcon } from 'lucide-react'
import Image from 'next/image'
import { formatRelativeDateTime } from '@/features/chat/lib/formatter'
import { type ChatRoom } from '@/features/chat/model/schema'

interface ChatRoomItemProps {
  chatRoom: ChatRoom
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
          sizes="100px"
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
