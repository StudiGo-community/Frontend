'use client'

import ReceivedMessage from '@/entities/message/ui/ReceivedMessage'
import SentMessage from '@/entities/message/ui/SentMessage'
import { useMemo } from 'react'
import Loading from '@/shared/ui/Loading'
import Error from '@/shared/ui/Error'
import { Button } from '@/shared/ui/Button'
import { ChevronDownIcon } from 'lucide-react'
import EmptyState from '@/shared/ui/EmptyState'
import { cn } from '@/shared/lib/cn'
import { useChatMessageList } from '@/entities/message/api/queries'
import useInfiniteScroll from '@/features/chat-message-scroll/lib/useInfiniteScroll'
import useMessageSubscribe from '@/features/chat-message-subscribe/model/useMessageSubscribe'
import { useSessionStore } from '@/entities/session/store/session-store'
import { useTokenStore } from '@/entities/session/store/token-store'
import useTts from '@/features/chat-message-tts/lib/useTts'

interface MessageListProps {
  enteredRoomId: number
}

const MESSAGE_STATUS_LAYOUT = 'h-full flex flex-1 items-center justify-center'

function MessageList({ enteredRoomId }: MessageListProps) {
  const {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    hasNextPage,
    isEnabled,
    isSuccess,
    fetchNextPage,
  } = useChatMessageList(enteredRoomId)
  const messages = useMemo(
    () => data?.pages.flatMap((page) => page.messages),
    [data?.pages]
  )
  const { containerRef } = useInfiniteScroll(
    messages,
    isFetchingNextPage,
    hasNextPage,
    isEnabled,
    fetchNextPage
  )

  const user = useSessionStore((state) => state.user)
  const accessToken = useTokenStore((state) => state.accessToken)
  useMessageSubscribe(isSuccess ? enteredRoomId : null, accessToken)

  const { speak } = useTts()

  const handleScrollButtonClick = () => {
    if (!containerRef.current) return
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative h-[calc(100vh-22rem)]">
      {isLoading && <Loading className={cn(MESSAGE_STATUS_LAYOUT)} />}
      {!user && error && (
        <Error
          className={cn(MESSAGE_STATUS_LAYOUT)}
          message={
            error.response?.data.detail ??
            '메세지를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.'
          }
        />
      )}
      {messages?.length === 0 && (
        <EmptyState
          className={cn(MESSAGE_STATUS_LAYOUT)}
          message="아직 대화가 없습니다. 첫 메세지를 보내보세요!"
        />
      )}
      {messages && (
        <ul
          className="flex h-full flex-col-reverse gap-4 overflow-y-auto pt-9 pb-16"
          ref={containerRef}
        >
          {messages.map((message) =>
            message.sender.id === user?.id ? (
              <SentMessage key={message.id} message={message} />
            ) : (
              <ReceivedMessage
                key={message.id}
                message={message}
                onPlayTts={speak}
              />
            )
          )}
          {isFetchingNextPage && <Loading />}
        </ul>
      )}
      {messages && (
        <Button
          type="button"
          className="absolute right-7 bottom-3 z-10 flex size-6 items-center justify-center rounded-full p-5 opacity-80 md:right-8 md:bottom-4"
          variant="secondary"
          onClick={handleScrollButtonClick}
          aria-label="채팅방 아래로 이동"
        >
          <ChevronDownIcon className="size-6" />
        </Button>
      )}
    </div>
  )
}

export default MessageList
