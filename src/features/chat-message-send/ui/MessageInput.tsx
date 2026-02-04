'use client'

import { useSendChatMessage } from '@/entities/message/api/queries'
import { cn } from '@/shared/lib/cn'
import { Button } from '@/shared/ui/Button'
import { inputGroupVariants } from '@/shared/ui/input'
import { useRef } from 'react'
import { toast } from 'sonner'
import { mapSendMessageToMessage } from '@/features/chat-message-send/model/mapper'
import useMessageCacheHandler from '@/entities/message/model/useMessageCacheHandler'
import { type SendMessage } from '@/entities/message/model/schema'
import { useSessionStore } from '@/entities/session/store/session-store'
import { LoaderCircleIcon } from 'lucide-react'

interface MessageInputProps {
  enteredRoomId: number
  className?: string
}

function MessageInput({ enteredRoomId, className }: MessageInputProps) {
  const user = useSessionStore((state) => state.user)
  const { handleNewMessage } = useMessageCacheHandler()
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmitSuccess = (data: SendMessage) => {
    if (!user) return

    const { nickname, profileImageUrl } = user
    handleNewMessage(
      enteredRoomId,
      mapSendMessageToMessage(data, nickname, profileImageUrl)
    )

    const form = formRef.current
    if (!form) return

    form.reset()
    setTimeout(() => form.querySelector('textarea')?.focus(), 100)
  }
  const { mutate, isPending } = useSendChatMessage({
    onSuccess: (data) => handleSubmitSuccess(data.message),
    onError: (error) =>
      toast.error(error.response?.data.detail ?? '메세지 전송에 실패했습니다.'),
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!enteredRoomId || !user) {
      toast.error('예기치 않은 오류가 발생했습니다.')
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    const content = String(formData.get('content')).trim()
    if (!content) return

    mutate({ roomId: enteredRoomId, content })
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
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn(
        'border-t-brand-gray-200 flex flex-col gap-4 border-t',
        className
      )}
    >
      <textarea
        onKeyDown={handleKeyDown}
        className={cn(
          inputGroupVariants({ variant: 'default', size: 'md' }),
          'resize-none border-none px-3 focus:outline-none'
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
        {isPending ? (
          <div className="animate-spin">
            <LoaderCircleIcon />
          </div>
        ) : (
          <span>전송</span>
        )}
      </Button>
    </form>
  )
}

export default MessageInput
