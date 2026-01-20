'use client'

import ChatRoomItem from '@/features/chat/ui/ChatRoomItem'
import { useSearchParams } from 'next/navigation'

// TODO: MSW 핸들러 만들때 옮기기
const CHAT_ROOMS = [
  {
    id: 1,
    name: 'DELE 시험 준비 채팅방',
    description: '#시험준비 #정보공유 #질의응답 #경험담',
    participantCount: 738,
    lastMessageAt: new Date('2026-01-20T11:21:30Z'),
    createdAt: new Date('2026-01-09T11:21:30Z'),
  },
  {
    id: 2,
    name: '여행 & 현지 경험 소통방',
    description: '#여행준비 #정보공유 #스페인소개 #경험담 #명소소개',
    participantCount: 538,
    lastMessageAt: new Date('2026-01-21T01:21:30Z'),
    createdAt: new Date('2026-01-09T11:21:30Z'),
  },
  {
    id: 3,
    name: '영화 & 드라마 소통방',
    description: '#영화감상 #영화추천 #드라마감상 #드라마추천',
    participantCount: 632,
    lastMessageAt: new Date('2026-01-02T00:21:30Z'),
    createdAt: new Date('2026-01-09T11:21:30Z'),
  },
  {
    id: 4,
    name: '자유 잡담방',
    description: '#원하는주제 #잡담방 #아무거나',
    participantCount: 1008,
    lastMessageAt: new Date('2026-01-20T00:40:30Z'),
    createdAt: new Date('2026-01-09T11:21:30Z'),
  },
]

function ChatRoomList() {
  const searchParams = useSearchParams()
  const order = searchParams.get('order')
  const orderedChatRooms = [...CHAT_ROOMS].sort((roomA, roomB) => {
    const timeA = roomA.lastMessageAt.getTime()
    const timeB = roomB.lastMessageAt.getTime()

    return order === 'asc' ? timeA - timeB : timeB - timeA
  })

  return (
    <ul className="grid gap-16 py-4">
      {orderedChatRooms.map((chatRoom) => (
        <ChatRoomItem key={chatRoom.id} chatRoom={chatRoom} />
      ))}
    </ul>
  )
}

export default ChatRoomList
