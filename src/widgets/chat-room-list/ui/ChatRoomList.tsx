'use client'

import ChatRoomItem from '@/widgets/chat-room-list/ui/ChatRoomItem'
import { useSearchParams } from 'next/navigation'
import Loading from '@/shared/ui/Loading'
import Error from '@/shared/ui/Error'
import { type ChatRoom } from '@/entities/chat-room/model/schema'
import { useChatRoomList } from '@/entities/chat-room/api/queries'

function ChatRoomList() {
  const { data, isLoading, error } = useChatRoomList()
  const searchParams = useSearchParams()
  const chatRooms = data?.rooms ?? []
  const order = searchParams.get('order')
  const orderedChatRooms = getOrderedChatRooms(chatRooms, order)

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
        {orderedChatRooms.map((chatRoom) => (
          <ChatRoomItem key={chatRoom.id} chatRoom={chatRoom} />
        ))}
      </ul>
    </div>
  )
}

export default ChatRoomList

const getOrderedChatRooms = (chatRooms: ChatRoom[], order: string | null) =>
  [...chatRooms].sort((roomA, roomB) => {
    const timeA = roomA.lastMessageAt.getTime()
    const timeB = roomB.lastMessageAt.getTime()

    return order === 'asc' ? timeA - timeB : timeB - timeA
  })
