import z from 'zod'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import EditPost from '@/widgets/community-form/ui/EditPost'
import ApiErrorBoundary from '@/shared/ui/ApiErrorBoundary'
import PostFormSkeleton from '@/features/community-post-manage/ui/PostFormSkeleton'

interface PageProps {
  params: Promise<{ id: string }>
}

const IdParamsSchema = z.coerce.number().int().positive()

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const validatedId = IdParamsSchema.safeParse(id)
  if (!validatedId.success) return notFound()

  return (
    <>
      <h1 className="text-brand-black border-brand-gray-200 mt-4 border-b pb-6 text-4xl font-extrabold">
        게시글 수정
      </h1>

      <ApiErrorBoundary>
        <Suspense fallback={<PostFormSkeleton />}>
          <EditPost id={validatedId.data} />
        </Suspense>
      </ApiErrorBoundary>
    </>
  )
}
