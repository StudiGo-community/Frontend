import { type Message } from '@/entities/message/model/schema'
import { cn } from '@/shared/lib/cn'
import Image from 'next/image'
import { formatTimeString } from '@/entities/message/lib/formatter'
import { LanguagesIcon, SirenIcon, Volume2Icon } from 'lucide-react'

interface ReceivedMessageProps {
  message: Message
  onPlayTts: (text: string, language: 'korean' | 'spanish') => void
}

function ReceivedMessage({ message, onPlayTts }: ReceivedMessageProps) {
  const isBlindMessage = message.status === 'DELETED_BY_ADMIN'

  return (
    <li className="flex max-w-4/5 flex-col gap-2 self-start">
      {/* 유저 정보 (닉네임/프로필) */}
      <div className="flex items-center gap-1.5">
        <div className="relative size-6">
          <Image
            // TODO: 외부 이미지 사용하기 전에 넥스트 설정에 등록하기
            src={
              message.sender.profileImageUrl ??
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
      {/* 메세지 */}
      <div className={cn('flex items-end gap-1', 'group relative')}>
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
        <span
          className={cn(
            'text-brand-gray-300 text-sm font-medium',
            'absolute -right-15.5 opacity-100 transition-all group-hover:opacity-0'
          )}
        >
          {formatTimeString(message.createdAt)}
        </span>
        <div
          className={cn(
            'text-brand-login-text bg-brand-gray-100 rounded-brand-base flex items-center px-1.5 py-1',
            'absolute opacity-0 transition-all group-hover:opacity-100',
            '-right-9 flex-col gap-1.5 sm:-right-20 sm:flex-row sm:gap-1'
          )}
        >
          <button type="button" onClick={() => {}}>
            <SirenIcon className="text-brand-third size-4.5" />
          </button>
          <button type="button" onClick={() => {}}>
            <LanguagesIcon className="size-4.5" />
          </button>
          <button
            type="button"
            // TODO: 현재 content에 따라 다른 언어 선택해서 보내기
            onClick={() => onPlayTts(message.content, 'spanish')}
          >
            <Volume2Icon className="size-4.5" />
          </button>
        </div>
      </div>
    </li>
  )
}

export default ReceivedMessage
