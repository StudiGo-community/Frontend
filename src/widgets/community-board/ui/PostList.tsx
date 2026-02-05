import PostCard from '@/entities/post/ui/PostCard'
import UrlPagination from '@/shared/ui/UrlPagination'
import getPosts from '@/widgets/community-board/api/getPosts'
import { CommunityBoardSearchParams } from '@/widgets/community-board/model/types'

export default async function PostList({
  searchParams,
}: {
  searchParams: CommunityBoardSearchParams
}) {
  const data = await getPosts(searchParams)

  return (
    <>
      {/* 게시글 목록 */}
      <ul
        id="community-post-list"
        className="flex flex-col gap-4 border-b-2 pb-8"
      >
        {data.posts.length > 0 ? (
          data.posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="text-brand-gray-300 py-20 text-center">
            해당 게시글이 없습니다.
          </div>
        )}
      </ul>

      {/* 페이지네이션 */}
      <UrlPagination
        page={Number(searchParams.page) || 1}
        totalPages={Math.ceil(data.count / 10)}
        searchParams={{
          page: searchParams.page,
          category: searchParams.category,
          sort: searchParams.sort,
          q: searchParams.q,
        }}
        className="mb-16 py-4"
      />
    </>
  )
}
