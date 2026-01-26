import {
  CommunityBanner,
  CommunityFilters,
  PostCard,
} from '@/features/community/ui'
import { MOCK_POSTS } from '@/features/community/mockData'
import UrlPagination from '@/shared/ui/UrlPagination'

// nuqs 쓰면 거기서 다시 처리
interface PageProps {
  searchParams: Promise<{
    page: string
    category: 'all' | 'free' | 'recruit' | 'study'
    sort: 'popular' | 'latest'
    query: string
  }>
}

export default async function Page({ searchParams }: PageProps) {
  const { page, category, sort, query } = await searchParams
  console.log(
    `page: ${page}, category: ${category}, sort: ${sort}, query: ${query}`
  )

  return (
    <>
      {/* 오늘의 문장 */}
      {/* TODO: 아래 여백 조정 */}
      <CommunityBanner />

      {/* 게시판 */}
      <section className="mt-16 space-y-8">
        <h1 className="text-brand-black text-4xl font-extrabold">게시판</h1>

        {/* 게시판 헤더 */}
        <CommunityFilters
          activeCategory={category ?? 'all'}
          sortBy={sort ?? 'popular'}
        />

        {/* 게시글 목록 */}
        <div
          id="community-post-list"
          className="flex flex-col gap-4 border-b-2 pb-8"
        >
          {MOCK_POSTS.length > 0 ? (
            MOCK_POSTS.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="text-brand-gray-300 py-20 text-center">
              해당 게시글이 없습니다.
            </div>
          )}
        </div>

        {/* 페이지네이션 */}
        <UrlPagination
          page={Number(page) || 1}
          totalPages={50} // TODO: API 수정 요청함. 결과에 따라 처리.
          searchParams={{ page, category, sort, query }}
          className="mb-16 py-4"
        />
      </section>

      {/* 플로팅 버튼 */}
      <div className="fixed right-10 bottom-10">
        <button className="bg-brand-third hover:bg-opacity-90 rounded-full px-6 py-3 font-bold text-white shadow-lg transition-all">
          플로팅 버튼
        </button>
      </div>
    </>
  )
}
