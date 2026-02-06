import PostCard from '@/entities/post/ui/PostCard'
import UrlPagination from '@/shared/ui/UrlPagination'
import { getPosts } from '@/widgets/community-board/api/getPosts'
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
      <ul className="flex flex-col gap-4 border-b-2 pb-8">
        {data.posts.length > 0 ? (
          data.posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <li className="text-brand-gray-300 flex flex-col gap-4 py-20 text-center">
            <span>아직 작성된 게시글이 없습니다.</span>
            <span>첫 게시글을 작성해 보세요!</span>
          </li>
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
