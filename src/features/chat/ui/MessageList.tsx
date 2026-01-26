'use client'

import ReceivedMessage from '@/features/chat/ui/ReceivedMessage'
import SentMessage from '@/features/chat/ui/SentMessage'
import { useChatMessageList } from '@/features/chat/api/queries'
import { useChatStore } from '@/features/chat/model/store'
import { useMemo } from 'react'
import Loading from '@/features/chat/ui/Loading'
import Error from '@/features/chat/ui/Error'

// TODO: 유저 정보 스토어에 저장된 것 불러오기
const userId = 1

function MessageList() {
  const roomId = useChatStore((state) => state.enteredRoomId)
  const { data, isLoading, error } = useChatMessageList(roomId)
  const messages = useMemo(
    () => data?.pages.flatMap((page) => page.messages),
    [data?.pages]
  )

  if (isLoading) return <Loading className="mt-9" />
  if (error)
    return (
      <Error
        className="mt-9"
        message={
          error.response?.data.detail ??
          '메세지를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.'
        }
      />
    )
  if (messages?.length === 0)
    return (
      <div className="text-brand-gray-500 mt-9 py-9 text-center">
        아직 대화가 없습니다. 첫 메세지를 보내보세요!
      </div>
    )
  return (
    <div className="mt-9">
      {/* TODO: 무한 스크롤 처리 추가 */}
      <ul className="flex flex-col gap-4">
        {messages?.map((message) =>
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
