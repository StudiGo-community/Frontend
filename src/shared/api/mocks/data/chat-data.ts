// ---------- 채팅방 목록 조회 ----------
export const CHAT_ROOMS = [
  {
    id: 1,
    name: 'DELE 시험 준비방',
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

const MESSAGE_COUNT = 100
const MESSAGE_CONTENTS = [
  '안녕하세용',
  '반갑습니당',
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam rerum dolorum, perspiciatis culpa atque dolore libero itaque voluptates id odio nisi velit officiis, tempore reiciendis, hic commodi explicabo dolores nihil!',
  '오늘 점심은 뭘 먹을까요?',
  '어제 눈이 왔는데 눈사람을 못 만들었어요...',
  '눈사람은 동글동글... 동글동글하다 동글동글한...',
  '펄이 먹고 싶어서 밀크티를 시켰는데 펄이 없었어요. 그래서 그냥 먹었어요..',
  '오늘은 진짜 일찍 자야지!!!!!!',
]

export const MESSAGES = Array.from({ length: MESSAGE_COUNT }, (_, i) => {
  const userId = Math.floor(Math.random() * 2) + 1

  return {
    id: i + 1,
    sender_user_id: userId,
    sender: {
      id: userId,
      nickname: userId === 1 ? '나' : '다른유저',
      profile_image_url: null,
    },
    content: MESSAGE_CONTENTS[i % MESSAGE_CONTENTS.length],
    status: 'SENT',
    created_at: new Date(Date.now() - i * 60000).toISOString(),
  }
})
