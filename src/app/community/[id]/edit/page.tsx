import z from 'zod'
import { notFound } from 'next/navigation'
import EditPostForm from '@/widgets/community-form/ui/EditPostForm'
import getPost from '@/widgets/community-post/api/getPost'

interface PageProps {
  params: Promise<{ id: string }>
}

const IdParamsSchema = z.coerce.number().int().positive()

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const validatedId = IdParamsSchema.safeParse(id)
  if (!validatedId.success) return notFound()

  const post = await getPost(validatedId.data)
  if (!post) return notFound()

  return (
    <>
      <h1 className="text-brand-black border-brand-gray-200 mt-4 border-b pb-6 text-4xl font-extrabold">
        게시글 수정
      </h1>

      <EditPostForm post={post} />
    </>
  )
}
