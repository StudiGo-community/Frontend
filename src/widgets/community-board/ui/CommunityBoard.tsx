import CommunityBoardFilters from '@/features/community-filter/ui/CommunityBoardFilters'
import { CommunityBoardSearchParams } from '@/widgets/community-board/model/types'
import PostCard from '@/entities/post/ui/PostCard'
import UrlPagination from '@/shared/ui/UrlPagination'
import { api } from '@/shared/api/client'
import { PostList, PostListSchema } from '@/entities/post/model/post.schema'

export default async function CommunityBoard({
  page,
  category,
  sort,
  query,
}: CommunityBoardSearchParams) {
  const { data: response } = await api.get<PostList>('/posts', {
    params: {
      page,
      category,
      sort,
      query,
    },
  })
  const parsed = PostListSchema.safeParse(response)

  console.log(page, category, sort, query)
  console.log(parsed)

  return (
    <section className="mt-16 space-y-8">
      <h1 className="text-brand-black text-4xl font-extrabold">게시판</h1>

      {/* 게시판 헤더 */}
      <CommunityBoardFilters searchParams={{ category, sort, query, page }} />

      {/* 게시글 목록 */}
      <ul
        id="community-post-list"
        className="flex flex-col gap-4 border-b-2 pb-8"
      >
        {parsed.success && parsed.data.posts.length > 0 ? (
          parsed.data.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="text-brand-gray-300 py-20 text-center">
            해당 게시글이 없습니다.
          </div>
        )}
      </ul>

      {/* 페이지네이션 */}
      <UrlPagination
        page={Number(page) || 1}
        totalPages={parsed.success ? Math.ceil(parsed.data.count / 10) : 1}
        searchParams={{ page, category, sort, query }}
        className="mb-16 py-4"
      />
    </section>
  )
}
