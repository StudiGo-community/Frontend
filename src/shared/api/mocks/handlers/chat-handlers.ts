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

const chatHandlers = [getChatRoomList]

export { chatHandlers }
