import { getChatRoomList } from '@/entities/chat-room/api/api'
import { chatKeys } from '@/shared/api/query-keys'
import ChatSidebar from '@/widgets/chat-sidebar/ui/ChatSidebar'
import ChatWindow from '@/widgets/chat-window/ui/ChatWindow'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

async function ChatDetails({
  params,
}: {
  params: Promise<{ roomId: string }>
}) {
  const { roomId } = await params
  const parsedRoomId = Number(roomId)
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: chatKeys.roomList('desc'),
    queryFn: () => getChatRoomList('desc'),
    staleTime: 1000 * 60,
  })

  return (
    <div className="mx-auto flex max-w-300 gap-8 pt-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ChatSidebar roomId={parsedRoomId} />
        <ChatWindow roomId={parsedRoomId} />
      </HydrationBoundary>
    </div>
  )
}

export default ChatDetails
