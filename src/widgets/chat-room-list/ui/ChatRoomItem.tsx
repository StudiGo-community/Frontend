'use client'

import { UserIcon } from 'lucide-react'
import Image from 'next/image'
import { formatRelativeDateTime } from '@/widgets/chat-room-list/lib/formatter'
import { cn } from '@/shared/lib/cn'
import { useChatStore } from '@/entities/chat-room/model/store'
import { toast } from 'sonner'
import { type ChatRoom } from '@/entities/chat-room/model/schema'
import { useEnterChatRoom } from '@/features/chat-room-enter/api/queries'

interface ChatRoomItemProps {
  chatRoom: ChatRoom
}

function ChatRoomItem({ chatRoom }: ChatRoomItemProps) {
  const enteredRoomId = useChatStore((state) => state.enteredRoomId)
  const { mutate: enterChatRoom, isPending } = useEnterChatRoom()

  const handleClick = () => {
    /* TODO: 로그인 안 한 유저는 입장 불가 토스트 보여주기 */
    if (isPending) return
    if (enteredRoomId && enteredRoomId !== chatRoom.id) {
      toast.warning('채팅방은 중복 입장할 수 없습니다.')
      return
    }
    enterChatRoom(enteredRoomId ?? chatRoom.id)
  }

  return (
    <li>
      <button
        type="button"
        className={cn(
          'rounded-brand-base flex w-full min-w-0 items-center py-10',
          'focus:outline-none',
          'hover:bg-brand-light focus-visible:bg-brand-light'
        )}
        onClick={handleClick}
        aria-label={`${chatRoom.name} 채팅방에 입장`}
      >
        <div className="relative mr-4 size-25 shrink-0">
          <Image
            src={`/images/chat/chat-room-thumbnail-${chatRoom.id}.webp`}
            alt={`${chatRoom.name} 채팅방 썸네일`}
            className="object-cover"
            fill
            sizes="100px"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-start">
          <span className="mb-2.5 text-xl font-bold">{chatRoom.name}</span>
          <span className="text-brand-gray-400 mb-2 w-full truncate text-start text-base">
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
      </button>
    </li>
  )
}

export default ChatRoomItem
