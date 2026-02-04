import { Suspense } from 'react'
import CommunityBoardFilters from '@/features/community-filter/ui/CommunityBoardFilters'
import PostList from '@/widgets/community-board/ui/PostList'
import PostListSkeleton from '@/widgets/community-board/ui/PostListSkeleton'
import { CommunityBoardSearchParams } from '@/widgets/community-board/model/types'
import ApiErrorBoundary from '@/shared/ui/ApiErrorBoundary'

export default async function CommunityBoard({
  page,
  category,
  sort,
  query,
}: CommunityBoardSearchParams) {
  return (
    <section className="mt-16 space-y-8">
      <h1 className="text-brand-black text-4xl font-extrabold">게시판</h1>

      {/* 게시판 헤더 */}
      <CommunityBoardFilters searchParams={{ category, sort, query, page }} />

      {/* 게시글 목록 */}
      <ApiErrorBoundary>
        <Suspense fallback={<PostListSkeleton />}>
          <PostList searchParams={{ category, sort, query, page }} />
        </Suspense>
      </ApiErrorBoundary>
    </section>
  )
}
