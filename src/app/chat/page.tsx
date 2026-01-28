import ChatRoomSortButton from '@/features/chat-room-sort/ui/ChatRoomSortButton'
import { ChatRoomList } from '@/widgets/chat-room-list'
import Image from 'next/image'
import { Suspense } from 'react'

function Chat() {
  return (
    <div className="mt-14 mb-35.5">
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
          <ChatRoomList />
        </Suspense>
      </section>
    </div>
  )
}

export default Chat
