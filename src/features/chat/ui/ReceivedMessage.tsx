import { formatTimeString } from '@/features/chat/lib/formatter'
import { cn } from '@/shared/lib/cn'
import Image from 'next/image'

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

function ReceivedMessage({ message }: { message: Message }) {
  const isBlindMessage = message.status === 'DELETED_BY_ADMIN'

  return (
    <li className="flex max-w-4/5 flex-col gap-2 self-start">
      <div className="flex items-center gap-1.5">
        <div className="relative size-6">
          <Image
            // TODO: 외부 이미지 사용하기 전에 넥스트 설정에 등록하기
            src={
              //   message.sender.profile_image_url ??
              '/images/profiles/default-1.webp'
            }
            alt={`${message.sender.nickname}의 프로필 이미지`}
            fill
            sizes="24px"
          />
        </div>
        <span className="text-brand-login-text text-lg">
          {message.sender.nickname}
        </span>
      </div>
      <div className="flex items-end gap-1">
        <span
          className={cn(
            'bg-brand-light text-brand-third rounded-brand-base flex-1 px-4 py-2.5 text-lg wrap-break-word whitespace-pre-wrap',
            {
              'bg-brand-gray-100 text-brand-gray-400': isBlindMessage,
            }
          )}
        >
          {isBlindMessage ? '블라인드 처리된 메시지입니다.' : message.content}
        </span>
        <span className="text-brand-gray-300 text-sm font-medium">
          {formatTimeString(new Date(message.created_at))}
        </span>
      </div>
    </li>
  )
}

export default ReceivedMessage
