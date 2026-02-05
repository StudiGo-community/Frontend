import z from 'zod'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import CommunityPost from '@/widgets/community-post/ui/CommunityPost'
import CommunityComments from '@/widgets/community-comments/ui/CommunityComments'
import CommunityPostSkeleton from '@/widgets/community-post/ui/CommunityPostSkeleton'
import CommunityCommentsSkeleton from '@/widgets/community-comments/ui/CommunityCommentsSkeleton'
import ApiErrorBoundary from '@/shared/ui/ApiErrorBoundary'

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ page?: string }>
}

const IdParamsSchema = z.coerce.number().int().positive()
// TODO: nuqs로 리팩토링?
const PageSearchParamsSchema = z.coerce
  .number()
  .int()
  .positive()
  .optional()
  .catch(undefined)

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params
  const validatedId = IdParamsSchema.safeParse(id)
  if (!validatedId.success) return notFound()

  const { page } = await searchParams
  const validatedPage = PageSearchParamsSchema.safeParse(page)

  return (
    <>
      {/* 게시글 */}
      <ApiErrorBoundary>
        <Suspense fallback={<CommunityPostSkeleton />}>
          <CommunityPost id={validatedId.data} />
        </Suspense>
      </ApiErrorBoundary>

      {/* 댓글 */}
      <ApiErrorBoundary>
        <Suspense fallback={<CommunityCommentsSkeleton />}>
          <CommunityComments
            postId={validatedId.data}
            page={validatedPage.data}
          />
        </Suspense>
      </ApiErrorBoundary>
    </>
  )
}
