import CommunityBanner from '@/widgets/community-quiz/ui/CommunityBanner'
import CommunityBoard from '@/widgets/community-board/ui/CommunityBoard'
import { CommunityBoardSearchParams } from '@/widgets/community-board/model/types'
import { FloatingChat } from '@/widgets/floating-chat/ui'

// nuqs 쓰면 거기서 다시 처리
interface PageProps {
  searchParams: Promise<CommunityBoardSearchParams>
}

export default async function Page({ searchParams }: PageProps) {
  // TODO: 따로 분리하지 말아야하나? (nuqs 도입시 리팩토링)
  const { page, category, sort, q } = await searchParams

  return (
    <>
      {/* 오늘의 문장 */}
      <CommunityBanner />

      {/* 게시판 */}
      <CommunityBoard page={page} category={category} sort={sort} q={q} />

      {/* 플로팅 채팅방 */}
      <FloatingChat />
    </>
  )
}
