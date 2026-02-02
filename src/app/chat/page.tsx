import { getChatRoomList } from '@/entities/chat-room/api/api'
import ChatRoomSortButton from '@/features/chat-room-sort/ui/ChatRoomSortButton'
import { chatKeys } from '@/shared/api/query-keys'
import { ChatRoomList } from '@/widgets/chat-room-list'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Image from 'next/image'
import { Suspense } from 'react'

async function Chat({
  searchParams,
}: {
  searchParams: Promise<{ sort: string }>
}) {
  const searchParam = await searchParams
  const sort = searchParam.sort ?? 'desc'
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: chatKeys.roomList(sort),
    queryFn: () => getChatRoomList(sort),
    staleTime: 60 * 1000,
  })

  return (
    <div className="mt-14 mb-35.5">
      {/* 배너 이미지 */}
      <section className="relative mb-12.5 aspect-8/1">
        <Image
          src="/images/chat/chat-banner.webp"
          alt="실시간 채팅 서비스 안내 배너"
          className="object-cover"
          fill
          preload
          sizes="100vw"
        />
      </section>
      {/* 채팅방 목록 */}
      <section className="mx-auto max-w-300 px-4">
        <h1 className="text-brand-black text-3xl font-black">실시간 채팅방</h1>
        <Suspense
          fallback={
            <div className="h-96 w-full animate-pulse rounded-xl bg-gray-50"></div>
          }
        >
          <div className="border-b-brand-gray-100 mt-8 mb-4 border-b">
            <div className="flex items-end justify-between">
              <div className="text-brand-black relative pb-4 text-lg font-bold">
                <span>전체</span>
                <div className="bg-brand-black absolute right-0 bottom-0 left-0 h-1" />
              </div>
              <ChatRoomSortButton />
            </div>
          </div>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ChatRoomList />
          </HydrationBoundary>
        </Suspense>
      </section>
    </div>
  )
}

export default Chat
