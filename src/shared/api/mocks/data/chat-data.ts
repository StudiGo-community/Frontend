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
const KO_MESSAGE_CONTENTS = [
  '안녕하세용',
  '반갑습니당',
  '교육은 세상을 바꾸기 위해 사용할 수 있는 가장 강력한 무기입니다. 이 채팅이 모두가 재미있고 효율적으로 스페인어를 배우는 데 도움이 되기를 바랍니다.',
  '오늘 점심은 뭘 먹을까요?',
  '어제 눈이 왔는데 눈사람을 못 만들었어요...',
  '눈사람은 동글동글... 동글동글하다 동글동글한...',
  '펄이 먹고 싶어서 밀크티를 시켰는데 펄이 없었어요. 그래서 그냥 먹었어요...',
  '오늘은 진짜 일찍 자야지!!!!!!',
]
const ES_MESSAGE_CONTENTS = [
  '¡Holaaa!',
  '¡Un gusto!',
  'La educación es el arma más poderosa que puedes usar para cambiar el mundo. Espero que este chat ayude a todos a aprender español de una manera divertida y eficiente.',
  '¿Qué comemos hoy para el almuerzo?',
  'Ayer nevó, pero no pude hacer un muñeco de nieve...',
  'Los muñecos de nieve son redonditos... redonditos, muy redonditos...',
  'Pedí té con leche porque quería perlas, pero no traía nada. Así que me lo tomé así...',
  '¡¡¡Hoy sí que me voy a dormir temprano!!!',
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
    ko_content: KO_MESSAGE_CONTENTS[i % KO_MESSAGE_CONTENTS.length],
    es_content: ES_MESSAGE_CONTENTS[i % ES_MESSAGE_CONTENTS.length],
    status: 'SENT',
    created_at: new Date(Date.now() - i * 60000).toISOString(),
  }
})

const SOCKET_MESSAGE_COUNT = 5

export const SOCKET_MESSAGES = Array.from(
  { length: SOCKET_MESSAGE_COUNT },
  (_, i) => ({
    id: MESSAGES.length + i + 1,
    sender_user_id: 3,
    sender: {
      id: 3,
      nickname: '웹소켓',
      profile_image_url: null,
    },
    ko_content: `웹소켓에서 수신한 ${i + 1}번째 메세지 입니다.`,
    es_content: `Este es el mensaje número ${i + 1} recibido por WebSocket.`,
    status: 'SENT',
    created_at: new Date(
      new Date(MESSAGES[0].created_at).getTime() + (i + 1) * 60000
    ).toISOString(),
  })
)
