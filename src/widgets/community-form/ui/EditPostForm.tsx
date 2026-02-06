'use client'

import PostForm from '@/features/community-post-manage/ui/PostForm'
import { useUpdatePostMutation } from '@/features/community-post-manage/model/useUpdatePostMutation'
import { extractImagesUrl } from '@/features/community-post-manage/lib/extract-images'
import { PostCreateForm } from '@/features/community-post-manage/model/post-create.schema'
import { PostDetail } from '@/entities/post/model/post.schema'

interface EditPostFormProps {
  post: PostDetail
}

export default function EditPostForm({ post }: EditPostFormProps) {
  const { mutate, isPending } = useUpdatePostMutation(post.id)

  const onSubmit = (data: PostCreateForm) => {
    const images = extractImagesUrl(data)
    const payload = {
      ...data,
      images: images,
      thumbnailUrl: images?.[0]?.url || null,
    }

    mutate(payload)
  }

  return (
    <PostForm
      onSubmit={onSubmit}
      isSubmitting={isPending}
      defaultValues={post}
    />
  )
}
