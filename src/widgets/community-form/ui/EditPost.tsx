import { notFound } from 'next/navigation'
import EditPostForm from '@/widgets/community-form/ui/EditPostForm'
import getPost from '@/entities/post/api/getPost'

interface EditPostProps {
  id: number
}

export default async function EditPost({ id }: EditPostProps) {
  const post = await getPost(id)
  if (!post) {
    return notFound()
  }

  return <EditPostForm post={post} />
}
