import { getChatMessageList } from '@/entities/message/api/api'
import MessageInput from '@/features/chat-message-send/ui/MessageInput'
import { chatKeys } from '@/shared/api/query-keys'
import ChatHeader from '@/widgets/chat-window/ui/ChatHeader'
import { ChatMessageView } from '@/features/chat-message-view/ui'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

interface ChatWindowProps {
  enteredRoomId: number
}

async function ChatWindow({ enteredRoomId }: ChatWindowProps) {
  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery({
    queryKey: chatKeys.messageList(enteredRoomId),
    queryFn: ({ pageParam }) =>
      getChatMessageList({
        roomId: enteredRoomId,
        cursor: pageParam,
      }),
    initialPageParam: undefined,
    staleTime: 1000 * 60,
  })

  return (
    <section className="mb-16 flex-1 px-3">
      <ChatHeader enteredRoomId={enteredRoomId} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ChatMessageView enteredRoomId={enteredRoomId} />
      </HydrationBoundary>
      <MessageInput enteredRoomId={enteredRoomId} />
    </section>
  )
}

export default ChatWindow
