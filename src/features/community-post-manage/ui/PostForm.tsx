'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  PostCreateForm,
  PostCreateFormSchema,
} from '@/features/community-post-manage/model/post-create.schema'
import CategoryField from '@/features/community-post-manage/ui/CategoryField'
import TitleField from '@/features/community-post-manage/ui/TitleField'
import ContentField from '@/features/community-post-manage/ui/ContentField'
import FormActionButtons from '@/features/community-post-manage/ui/FormActionButtons'
import { useCreatePostMutation } from '@/features/community-post-manage/model/useCreatePostMutation'
import { extractImagesUrl } from '../lib/extract-images'

// TODO: defaultValues 인자로 받아오기
export default function PostForm() {
  const router = useRouter()
  const { mutate, isPending } = useCreatePostMutation()

  const form = useForm<PostCreateForm>({
    resolver: zodResolver(PostCreateFormSchema),
    defaultValues: {
      title: '',
      content: '',
      category: undefined,
    },
  })

  const onSubmit = (data: PostCreateForm) => {
    const images = extractImagesUrl(data)
    const payload = {
      ...data,
      images: images,
      thumbnailUrl: images?.[0].url || null,
    }

    mutate(payload)
  }

  return (
    <form
      id="community-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="mb-20 flex flex-col gap-2"
    >
      {/* 카테고리 */}
      {/* 제어 컴포넌트 또는 커스텀 컴포넌트 방식 */}
      <CategoryField control={form.control} />

      {/* 제목 */}
      {/* 비제어 컴포넌트 방식 */}
      <TitleField
        register={form.register}
        error={form.formState.errors.title}
      />

      {/* 내용 */}
      <ContentField control={form.control} />

      {/* 하단 고정 풋터 */}
      <FormActionButtons
        onCancel={() => router.back()}
        onReset={() => form.reset()}
        isSubmitting={isPending}
      />
    </form>
  )
}
