'use client'

import { Loader2Icon, LogOutIcon, UserIcon } from 'lucide-react'
import Image from 'next/image'
import { useChatRoomList } from '@/entities/chat-room/api/queries'
import Loading from '@/shared/ui/Loading'
import Error from '@/shared/ui/Error'
import { Button } from '@/shared/ui/Button'
import useExitChat from '@/features/chat-room-exit/lib/useExitChat'

interface ChatHeaderProps {
  enteredRoomId: number
}

const HEADER_STATUS_LAYOUT = 'border-b-brand-gray-200 border-b py-9'

function ChatHeader({ enteredRoomId }: ChatHeaderProps) {
  const { data, isLoading, error } = useChatRoomList()
  const { exit, isExitPending } = useExitChat()
  const currentRoom = data?.find((room) => room.id === enteredRoomId)

  if (isLoading) return <Loading className={HEADER_STATUS_LAYOUT} />
  if (error)
    return (
      <Error
        className={HEADER_STATUS_LAYOUT}
        message={
          error.response?.data.detail ?? '채팅방 정보를 불러오지 못했습니다.'
        }
      />
    )
  if (!isLoading && !currentRoom)
    return (
      <Error
        className={HEADER_STATUS_LAYOUT}
        message="채팅방 정보를 찾을 수 없습니다."
      />
    )
  return (
    <div className="border-b-brand-gray-200 flex max-w-239 items-center border-b py-2.5">
      <div className="relative mr-3 size-19">
        <Image
          src={`/images/chat/chat-room-thumbnail-${currentRoom?.id}.webp`}
          alt={`${currentRoom?.name} 채팅방 썸네일`}
          className="object-cover"
          fill
          sizes="76px"
          priority
        />
      </div>
      <div className="flex flex-1 flex-col items-start">
        <span className="mb-1 text-4xl font-medium">{currentRoom?.name}</span>
        <div className="text-brand-gray-300 flex items-center gap-1 text-xl font-semibold">
          <UserIcon size={20} strokeWidth={2.8} />
          <span>{currentRoom?.participantCount} 참여중</span>
        </div>
      </div>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="bg-brand-black/80 mt-1 self-start"
        onClick={() => exit(enteredRoomId)}
        aria-label="채팅방 퇴장"
        disabled={isExitPending}
      >
        {isExitPending ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <LogOutIcon />
        )}
      </Button>
    </div>
  )
}

export default ChatHeader
