'use client'

import { UserIcon } from 'lucide-react'
import Image from 'next/image'
import { formatRelativeDateTime } from '@/widgets/chat-room-lobby/lib/formatter'
import { cn } from '@/shared/lib/cn'
import { useChatStore } from '@/entities/chat-room/model/store'
import { toast } from 'sonner'
import {
  type ChatRoom,
  type ChatRoomEnterResponse,
} from '@/entities/chat-room/model/schema'
import { useEnterChatRoom } from '@/features/chat-room-enter/api/queries'
import { useTokenStore } from '@/entities/session/store/token-store'
import { useRouter } from 'next/navigation'

interface ChatRoomItemProps {
  chatRoom: ChatRoom
}

const LOADING_TOAST_ID = 'ENTER_ROOM'

function ChatRoomItem({ chatRoom }: ChatRoomItemProps) {
  const router = useRouter()
  const accessToken = useTokenStore((state) => state.accessToken)
  const enteredRoomId = useChatStore((state) => state.enteredRoomId)
  const setEnteredRoomId = useChatStore((state) => state.setEnteredRoomId)
  const isEnteredChatRoom = enteredRoomId == chatRoom.id

  const handleEnterChatRoomSuccess = (data: ChatRoomEnterResponse) => {
    const roomId = data.room.id
    setEnteredRoomId(roomId)
    toast.success('입장 성공!', { id: LOADING_TOAST_ID })
    router.push(`/chat/${roomId}`)
  }
  const { mutate: enterChatRoom, isPending } = useEnterChatRoom({
    onSuccess: handleEnterChatRoomSuccess,
    onError: (error) =>
      toast.error(error.response?.data.detail ?? '채팅방 입장에 실패했습니다.'),
  })

  const handleClick = () => {
    // 입장 제한
    if (isPending) return
    if (!accessToken) {
      toast.error('로그인 후에 입장할 수 있습니다.')
      return
    }
    if (enteredRoomId && !isEnteredChatRoom) {
      // TODO: 채팅방 퇴장 API 붙이고 나서 기존 채팅방 퇴장 → 새로운 채팅방 입장할지 묻는 모달로 바꾸기
      toast.warning('채팅방은 중복 입장할 수 없습니다.')
      return
    }

    // 입장
    if (isEnteredChatRoom) {
      router.push(`/chat/${chatRoom.id}`)
      return
    }
    toast.loading('채팅방 입장 중...', { id: LOADING_TOAST_ID })
    enterChatRoom(chatRoom.id)
  }

  return (
    <li className="relative">
      <button
        type="button"
        className={cn(
          'rounded-brand-base flex w-full min-w-0 items-center border border-transparent py-10',
          'focus:outline-none',
          'hover:bg-brand-light focus-visible:bg-brand-light',
          {
            'border-brand-side bg-brand-light px-2': isEnteredChatRoom,
            'cursor-wait': isPending,
          }
        )}
        onClick={handleClick}
        aria-label={`${chatRoom.name} 채팅방에 입장`}
      >
        {/* 접속 중인 채팅방 알림 배지 */}
        {isEnteredChatRoom && (
          <div className="bg-brand-main text-brand-white rounded-brand-sm absolute top-5 left-31 px-2 py-0.5 text-xs">
            접속 중인 채팅방
          </div>
        )}
        {/* 채팅방 썸네일 */}
        <div className="relative mr-4 size-25 shrink-0">
          <Image
            src={`/images/chat/chat-room-thumbnail-${chatRoom.id}.webp`}
            alt={`${chatRoom.name} 채팅방 썸네일`}
            className="object-cover"
            fill
            sizes="100px"
          />
        </div>
        {/* 채팅방 정보 */}
        <div className="flex min-w-0 flex-1 flex-col items-start">
          <span className="mb-2.5 w-full truncate text-start text-xl font-bold">
            {chatRoom.name}
          </span>
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
