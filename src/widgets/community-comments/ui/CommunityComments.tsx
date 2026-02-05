import { Button } from '@/shared/ui/Button'
import { Textarea } from '@/shared/ui/Textarea'
import UrlPagination from '@/shared/ui/UrlPagination'
import CommunityComment from '@/widgets/community-comments/ui/CommunityComment'
import getComments from '@/widgets/community-comments/api/getComments'

interface CommunityCommentsProps {
  postId: number
  page?: number
}

export default async function CommunityComments({
  postId,
  page,
}: CommunityCommentsProps) {
  const { comments, pagination } = await getComments(postId, page)

  return (
    <section className="mb-20">
      {/* 댓글 목록 */}
      <div className="flex flex-col">
        <ul className="border-brand-gray-100 flex flex-col gap-8 border-y-2 py-8">
          {comments.map((comment) => (
            <CommunityComment key={comment.id} comment={comment} />
          ))}
        </ul>
        <UrlPagination
          totalPages={pagination.totalPages}
          page={pagination.page}
          searchParams={{}}
          className="py-12"
        />
      </div>

      {/* TODO: 컴포넌트 분리 (클라이언트 컴포넌트 + 기능 컴포넌트 필요) */}
      {/* 댓글 작성 */}
      <div className="flex flex-col gap-4">
        <Textarea
          placeholder="댓글을 입력해주세요"
          className="min-h-32 px-6 py-4 focus-visible:ring-1"
        />
        <div className="flex items-center justify-between gap-2">
          <span className="text-brand-gray-400">0 / 500</span>
          <Button variant="secondary" size="sm" className="px-6 text-sm">
            등록
          </Button>
        </div>
      </div>
    </section>
  )
}
