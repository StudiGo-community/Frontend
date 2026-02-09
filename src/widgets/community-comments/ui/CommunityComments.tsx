import UrlPagination from '@/shared/ui/UrlPagination'
import CommunityComment from '@/widgets/community-comments/ui/CommunityComment'
import { getComments } from '@/widgets/community-comments/api/getComments'
import { getUser } from '@/shared/api/getUser'
import CommentForm from '@/features/community-comment-manage/ui/CommentForm'

interface CommunityCommentsProps {
  postId: number
  page?: number
}

export default async function CommunityComments({
  postId,
  page,
}: CommunityCommentsProps) {
  const [{ comments, pagination }, user] = await Promise.all([
    getComments(postId, page),
    getUser(),
  ])

  return (
    <section className="mb-16">
      {/* 댓글 목록 */}
      <div className="flex flex-col">
        <ul className="border-brand-gray-100 flex flex-col gap-8 border-y-2 py-8">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommunityComment
                key={comment.id}
                comment={comment}
                userId={user?.id}
                postId={postId}
                currentPage={page}
              />
            ))
          ) : (
            <li className="text-brand-gray-300 flex flex-col gap-4 py-20 text-center">
              <span>아직 작성된 댓글이 없습니다.</span>
              {user && <span>첫 댓글을 작성해 보세요!</span>}
            </li>
          )}
        </ul>
        <UrlPagination
          totalPages={pagination.totalPages}
          page={pagination.page}
          className="pt-12"
        />
      </div>

      {/* 댓글 작성 */}
      {user && <CommentForm postId={postId} />}
    </section>
  )
}
