import ReceivedMessage from '@/features/chat/ui/ReceivedMessage'
import SentMessage from '@/features/chat/ui/SentMessage'

// TODO: 유저 정보 스토어에 저장된 것 불러오기
const userId = 1
// TODO: MSW 핸들러 설정할 때 옮기기
const MESSAGES = {
  room_id: 2,
  messages: [
    {
      id: 1,
      sender_user_id: userId,
      sender: {
        id: userId,
        nickname: '길동',
        profile_image_url: 'https://...',
      },
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam rerum dolorum, perspiciatis culpa atque dolore libero itaque voluptates id odio nisi velit officiis, tempore reiciendis, hic commodi explicabo dolores nihil!',
      status: 'SENT',
      created_at: '2026-01-24T11:23:11Z',
    },
    {
      id: 2,
      sender_user_id: 2,
      sender: {
        id: 2,
        nickname: '철수',
        profile_image_url: 'https://...',
      },
      content: '안녕!',
      status: 'SENT',
      created_at: '2026-01-24T11:24:11Z',
    },
    {
      id: 3,
      sender_user_id: 3,
      sender: {
        id: 3,
        nickname: '영희',
        profile_image_url: 'https://...',
      },
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae modi architecto delectus velit doloribus libero fugit nam ducimus vel provident, commodi, assumenda animi hic ea officia deleniti ab nostrum fuga.',
      status: 'SENT',
      created_at: '2026-01-24T11:24:11Z',
    },
    {
      id: 4,
      sender_user_id: userId,
      sender: {
        id: userId,
        nickname: '길동',
        profile_image_url: 'https://...',
      },
      content: '뭐해??',
      status: 'SENT',
      created_at: '2026-01-24T11:25:11Z',
    },
    {
      id: 5,
      sender_user_id: 3,
      sender: {
        id: 3,
        nickname: '영희',
        profile_image_url: 'https://...',
      },
      content: '밤샘하는 중 ㅠㅠ',
      status: 'SENT',
      created_at: '2026-01-24T11:26:11Z',
    },
    {
      id: 6,
      sender_user_id: 2,
      sender: {
        id: 2,
        nickname: '철수',
        profile_image_url: 'https://...',
      },
      content: '메롱',
      status: 'DELETED_BY_ADMIN',
      created_at: '2026-01-24T11:27:11Z',
    },
    {
      id: 7,
      sender_user_id: userId,
      sender: {
        id: userId,
        nickname: '길동',
        profile_image_url: 'https://...',
      },
      content: '메롱',
      status: 'DELETED_BY_ADMIN',
      created_at: '2026-01-24T11:27:11Z',
    },
    {
      id: 8,
      sender_user_id: userId,
      sender: {
        id: userId,
        nickname: '길동',
        profile_image_url: 'https://...',
      },
      content:
        'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
      status: 'SENT',
      created_at: '2026-01-24T11:27:11Z',
    },
  ],
} as const

function MessageList() {
  return (
    <div className="mt-9">
      <ul className="flex flex-col gap-4">
        {MESSAGES.messages.map((message) =>
          message.sender.id === userId ? (
            <SentMessage key={message.id} message={message} />
          ) : (
            <ReceivedMessage key={message.id} message={message} />
          )
        )}
      </ul>
    </div>
  )
}

export default MessageList
