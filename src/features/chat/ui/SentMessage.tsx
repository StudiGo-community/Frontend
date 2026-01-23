import { formatTimeString } from '@/features/chat/lib/formatter'
import { cn } from '@/shared/lib/cn'

// TODO: API 연동할 때 스키마에서 뽑은 타입으로 변경하기
interface Message {
  id: number
  sender_user_id: number
  sender: {
    id: number
    nickname: string
    profile_image_url: string
  }
  content: string
  status: 'SENT' | 'DELETED_BY_ADMIN'
  created_at: string
}

function SentMessage({ message }: { message: Message }) {
  const isBlindMessage = message.status === 'DELETED_BY_ADMIN'

  return (
    <li className="flex max-w-4/5 items-end gap-1 self-end">
      <span className="text-brand-gray-300 text-sm font-medium">
        {formatTimeString(new Date(message.created_at))}
      </span>
      <span
        className={cn(
          'bg-brand-third text-brand-light rounded-brand-base flex-1 px-4 py-2.5 text-lg wrap-break-word whitespace-pre-wrap',
          {
            'bg-brand-gray-100 text-brand-gray-400': isBlindMessage,
          }
        )}
      >
        {isBlindMessage ? '블라인드 처리된 메시지입니다.' : message.content}
      </span>
    </li>
  )
}

export default SentMessage
