import { http, HttpResponse } from 'msw'

// ---------- 채팅방 목록 조회 ----------
const CHAT_ROOMS = [
  {
    id: 1,
    name: 'DELE 시험 준비 채팅방',
    description: '#시험준비 #정보공유 #질의응답 #경험담',
    participant_count: 738,
    last_message_at: '2026-01-20T11:21:30Z',
    created_at: '2026-01-09T11:21:30Z',
  },
  {
    id: 2,
    name: '여행 & 현지 경험 소통방',
    description: '#여행준비 #정보공유 #스페인소개 #경험담 #명소소개',
    participant_count: 538,
    last_message_at: '2026-01-21T01:21:30Z',
    created_at: '2026-01-09T11:21:30Z',
  },
  {
    id: 3,
    name: '영화 & 드라마 소통방',
    description: '#영화감상 #영화추천 #드라마감상 #드라마추천',
    participant_count: 632,
    last_message_at: '2026-01-02T00:21:30Z',
    created_at: '2026-01-09T11:21:30Z',
  },
  {
    id: 4,
    name: '자유 잡담방',
    description: '#원하는주제 #잡담방 #아무거나',
    participant_count: 1008,
    last_message_at: '2026-01-20T00:40:30Z',
    created_at: '2026-01-09T11:21:30Z',
  },
]

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
