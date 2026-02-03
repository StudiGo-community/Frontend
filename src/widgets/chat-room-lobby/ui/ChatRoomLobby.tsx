import { getChatRoomList } from '@/entities/chat-room/api/api'
import ChatRoomSortButton from '@/features/chat-room-sort/ui/ChatRoomSortButton'
import { chatKeys } from '@/shared/api/query-keys'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import ChatRoomList from '@/widgets/chat-room-lobby/ui/ChatRoomList'

interface ChatRoomLobbyProps {
  sort: string
}

async function ChatRoomLobby({ sort }: ChatRoomLobbyProps) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: chatKeys.roomList(sort),
    queryFn: () => getChatRoomList(sort),
    staleTime: 1000 * 60,
  })

  return (
    <section className="mx-auto max-w-300 px-4">
      <h1 className="text-brand-black text-3xl font-black">실시간 채팅방</h1>
      {/* 채팅방 필터링 메뉴 */}
      <div className="border-b-brand-gray-100 mt-8 mb-4 border-b">
        <div className="flex items-end justify-between">
          <div className="text-brand-black relative pb-4 text-lg font-bold">
            <span>전체</span>
            <div className="bg-brand-black absolute right-0 bottom-0 left-0 h-1" />
          </div>
          <ChatRoomSortButton />
        </div>
      </div>
      {/* 채팅방 목록 */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ChatRoomList />
      </HydrationBoundary>
    </section>
  )
}

export default ChatRoomLobby
