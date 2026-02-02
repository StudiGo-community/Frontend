'use client'

import ChatRoomItem from '@/widgets/chat-room-list/ui/ChatRoomItem'
import { useSearchParams } from 'next/navigation'
import Loading from '@/shared/ui/Loading'
import Error from '@/shared/ui/Error'
import { useChatRoomList } from '@/entities/chat-room/api/queries'

function ChatRoomList() {
  const searchParams = useSearchParams()
  const sort = searchParams.get('sort') ?? 'desc'
  const { data, isLoading, error } = useChatRoomList(sort)
  const chatRooms = data?.rooms ?? []

  if (isLoading) return <Loading />
  if (error)
    return (
      <Error
        message={
          error.response?.data.detail ??
          '채팅방 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.'
        }
      />
    )
  return (
    <div>
      <ul className="grid">
        {chatRooms.map((chatRoom) => (
          <ChatRoomItem key={chatRoom.id} chatRoom={chatRoom} />
        ))}
      </ul>
    </div>
  )
}

export default ChatRoomList
