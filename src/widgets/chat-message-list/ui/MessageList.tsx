'use client'

import ReceivedMessage from '@/entities/message/ui/ReceivedMessage'
import SentMessage from '@/entities/message/ui/SentMessage'
import { useChatStore } from '@/entities/chat-room/model/store'
import { useMemo } from 'react'
import Loading from '@/shared/ui/Loading'
import Error from '@/shared/ui/Error'
import { Button } from '@/shared/ui/Button'
import { ChevronDownIcon } from 'lucide-react'
import EmptyState from '@/shared/ui/EmptyState'
import { cn } from '@/shared/lib/cn'
import { useChatMessageList } from '@/entities/message/api/queries'
import useInfiniteScroll from '@/features/chat-message-scroll/lib/useInfiniteScroll'

// TODO: 유저 정보 스토어에 저장된 것 불러오기
const userId = 1
const MESSAGE_STATUS_LAYOUT = 'h-full flex flex-1 items-center justify-center'

function MessageList() {
  const roomId = useChatStore((state) => state.enteredRoomId)
  const {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    hasNextPage,
    isEnabled,
    fetchNextPage,
  } = useChatMessageList(roomId)
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
      {error && (
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
          className="flex h-full flex-col gap-4 overflow-y-auto pt-9 pb-16"
          ref={containerRef}
        >
          {messages.map((message) =>
            message.sender.id === userId ? (
              <SentMessage key={message.id} message={message} />
            ) : (
              <ReceivedMessage key={message.id} message={message} />
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
