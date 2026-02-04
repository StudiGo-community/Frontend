import CommunityBanner from '@/widgets/community-quiz/ui/CommunityBanner'
import CommunityBoard from '@/widgets/community-board/ui/CommunityBoard'
import { CommunityBoardSearchParams } from '@/widgets/community-board/model/types'

// nuqs 쓰면 거기서 다시 처리
interface PageProps {
  searchParams: Promise<CommunityBoardSearchParams>
}

export default async function Page({ searchParams }: PageProps) {
  // TODO: 따로 분리하지 말아야하나? (nuqs 도입시 리팩토링)
  const { page, category, sort, query } = await searchParams

  return (
    <>
      {/* 오늘의 문장 */}
      <CommunityBanner />

      {/* 게시판 */}
      <CommunityBoard
        page={page}
        category={category}
        sort={sort}
        query={query}
      />

      {/* 플로팅 채팅방 */}
    </>
  )
}
