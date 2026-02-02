'use client'

import { useSendChatMessage } from '@/entities/message/api/queries'
import { cn } from '@/shared/lib/cn'
import { Button } from '@/shared/ui/Button'
import { inputGroupVariants } from '@/shared/ui/input'
import React from 'react'
import { toast } from 'sonner'
import { mapSendMessageToMessage } from '@/features/chat-message-send/model/mapper'
import useMessageCacheHandler from '@/entities/message/model/useMessageCacheHandler'
import { type SendMessage } from '@/entities/message/model/schema'
import { useSessionStore } from '@/entities/session/store/session-store'

interface MessageInputProps {
  enteredRoomId: number
}

function MessageInput({ enteredRoomId }: MessageInputProps) {
  const user = useSessionStore((state) => state.user)
  const { handleNewMessage } = useMessageCacheHandler()

  const handleSubmitSuccess = (data: SendMessage) => {
    if (!user) return

    const { nickname, profileImageUrl } = user
    handleNewMessage(
      enteredRoomId,
      mapSendMessageToMessage(data, nickname, profileImageUrl)
    )
  }
  const { mutate, isPending } = useSendChatMessage({
    onSuccess: (data) => handleSubmitSuccess(data.message),
    onError: (error) =>
      toast.error(error.response?.data.detail ?? '메세지 전송에 실패했습니다.'),
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!enteredRoomId) {
      toast.error('예기치 않은 오류가 발생했습니다.')
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    const content = String(formData.get('content')).trim()
    if (!content) return

    mutate(
      { roomId: enteredRoomId, content },
      { onSuccess: () => form.reset() }
    )
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.nativeEvent.isComposing) return
    if (event.key.toLowerCase() === 'enter' && !event.shiftKey) {
      event.preventDefault()
      event.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t-brand-gray-200 flex flex-col gap-4 border-t"
    >
      <textarea
        onKeyDown={handleKeyDown}
        className={cn(
          inputGroupVariants({ variant: 'default', size: 'md' }),
          'resize-none border-none px-3 focus:outline-none',
          { 'bg-brand-gray-100 animate-pulse': isPending }
        )}
        name="content"
        placeholder="메세지를 입력해주세요."
        disabled={isPending}
      ></textarea>
      <Button
        type="submit"
        size="sm"
        className="text-md self-end px-8 font-light"
        disabled={isPending}
      >
        전송
      </Button>
    </form>
  )
}

export default MessageInput
