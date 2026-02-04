'use client'
import PostForm from '@/features/community-post-manage/ui/PostForm'
import { useCreatePostMutation } from '@/features/community-post-manage/model/useCreatePostMutation'
import { extractImagesUrl } from '@/features/community-post-manage/lib/extract-images'
import { PostCreateForm } from '@/features/community-post-manage/model/post-create.schema'

export default function CreatePostForm() {
  const { mutate, isPending } = useCreatePostMutation()

  const onSubmit = (data: PostCreateForm) => {
    const images = extractImagesUrl(data)
    const payload = {
      ...data,
      images: images,
      thumbnailUrl: images?.[0]?.url || null,
    }

    mutate(payload)
  }

  return <PostForm onSubmit={onSubmit} isSubmitting={isPending} />
}
