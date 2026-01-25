import { http, HttpResponse } from 'msw'
import { CHAT_ROOMS } from '@/shared/api/mocks/data/chat-data'

// ---------- 채팅방 목록 조회 ----------
const getChatRoomList = http.get(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/chat`,
  async () => {
    return HttpResponse.json({ rooms: CHAT_ROOMS })
    // await new Promise(() => setTimeout(() => {}, 30000)).then(() => {
    //   return HttpResponse.json({ rooms: CHAT_ROOMS })
    // })
    // return HttpResponse.json(
    //   { detail: '인증정보가 유효하지 않습니다.' },
    //   { status: 401 }
    // )
  }
)

// ---------- 채팅방 입장 ----------
const enterChatRoom = http.post<{ roomId?: string }>(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/chat/:roomId`,
  ({ params }) => {
    const { roomId } = params
    const parsedRoomId = Number(roomId)

    if ([1, 2, 3, 4].includes(parsedRoomId ?? '')) {
      return HttpResponse.json({
        message: '채팅방에 입장했습니다.',
        room: {
          id: parsedRoomId,
          name: CHAT_ROOMS.find((room) => room.id === parsedRoomId)?.name,
        },
      })
    }
    return HttpResponse.json(
      { detail: '채팅방을 찾을 수 없습니다.' },
      { status: 404 }
    )
  }
)

const chatHandlers = [getChatRoomList, enterChatRoom]

export { chatHandlers }
