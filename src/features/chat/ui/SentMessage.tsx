import { formatTimeString } from '@/features/chat/lib/formatter'
import { cn } from '@/shared/lib/cn'
import { Message } from '@/features/chat/model/schema'

interface SentMessageProps {
  message: Message
}

function SentMessage({ message }: SentMessageProps) {
  const isBlindMessage = message.status === 'DELETED_BY_ADMIN'

  return (
    <li className="flex max-w-4/5 items-end gap-1 self-end">
      <span className="text-brand-gray-300 text-sm font-medium">
        {formatTimeString(message.createdAt)}
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
