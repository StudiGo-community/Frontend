import { ChatRoomLobby } from '@/widgets/chat-room-lobby/ui'

import Image from 'next/image'

async function Chat({
  searchParams,
}: {
  searchParams: Promise<{ sort: string }>
}) {
  const searchParam = await searchParams
  const sort = searchParam.sort ?? 'desc'

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
      {/* 채팅방 목록 영역 (필터링 메뉴, 목록) */}
      <ChatRoomLobby sort={sort} />
    </div>
  )
}

export default Chat
