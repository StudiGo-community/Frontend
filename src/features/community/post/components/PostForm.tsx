'use client'

import { useForm, FormProvider, Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import { DropdownMenu } from '@/shared/ui/DropdownMenu'
import { postSchema, type PostFormData } from '@/shared/api/schema/postSchema'
import TipTapEditor from '@/features/community/post/components/editor/TipTapEditor'
import TagInput from '@/features/community/post/components/TagInput'
import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'
import { ChevronDown } from 'lucide-react'

const CATEGORY_OPTIONS = [
  { label: '자유게시판', value: '자유게시판' },
  { label: '모집게시판', value: '모집게시판' },
  { label: '학습게시판', value: '학습게시판' },
]

export default function PostForm({
  initialData,
  isEditing,
}: {
  initialData?: Partial<PostFormData>
  isEditing?: boolean
}) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const methods = useForm<PostFormData>({
    resolver: zodResolver(postSchema) as Resolver<PostFormData>,
    defaultValues: initialData || {
      title: '',
      boardId: '',
      content: '',
      tags: [],
    },
  })

  const mutation = useMutation({
    mutationFn: async (formData: PostFormData) =>
      axios.post('/api/v1/posts', {
        ...formData,
        category: formData.boardId || '자유게시판',
        thumbnail_url: null,
        images: [],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      router.push('/community')
    },
    onError: (err: AxiosError<{ detail?: string }>) => {
      const errorMessage = err.response?.data?.detail || '등록 실패'
      alert(errorMessage)
    },
  })

  const handleFormSubmit = (data: PostFormData) => {
    mutation.mutate(data)
  }

  let submitButtonText = '등록하기'
  if (mutation.isPending) {
    submitButtonText = '등록 중...'
  } else if (isEditing) {
    submitButtonText = '수정 완료'
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className="bg-brand-white mx-auto flex max-w-300 flex-col gap-4 pt-4 pb-32"
      >
        <div className="flex flex-col gap-4">
          <div className="w-64">
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <button
                  type="button"
                  className={cn(
                    'bg-brand-gray-100 rounded-brand-base hover:border-brand-gray-300 flex w-full items-center justify-between border p-3 text-left transition-all outline-none',
                    methods.formState.errors.boardId && 'border-brand-error'
                  )}
                >
                  <span
                    className={cn(
                      !methods.watch('boardId') && 'text-brand-gray-400'
                    )}
                  >
                    {methods.watch('boardId') || '게시판을 선택해 주세요.'}
                  </span>
                  <ChevronDown className="text-brand-gray-400 size-4" />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content className="w-64 rounded-md border bg-white p-1 shadow-lg">
                {CATEGORY_OPTIONS.map((opt) => (
                  <DropdownMenu.Item
                    key={opt.value}
                    onSelect={() =>
                      methods.setValue('boardId', opt.value, {
                        shouldValidate: true,
                      })
                    }
                    className="hover:bg-brand-gray-50 cursor-pointer px-3 py-2 text-sm outline-none"
                  >
                    {opt.label}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu>
          </div>

          <input
            {...methods.register('title')}
            placeholder="제목을 입력해 주세요."
            className={cn(
              'bg-brand-gray-50 placeholder:text-brand-gray-300 border-brand-gray-100 focus:border-brand-main text-md rounded-md border px-4 py-4 font-bold transition-all outline-none',
              methods.formState.errors.title && 'border-brand-error'
            )}
          />
        </div>

        <div
          className={cn(
            'rounded-brand-xl shadow-brand-sm overflow-hidden border',
            methods.formState.errors.content && 'border-brand-error'
          )}
        >
          <TipTapEditor
            content={methods.watch('content')}
            onChange={(val) =>
              methods.setValue('content', val, { shouldValidate: true })
            }
          />
        </div>

        <TagInput />

        <div className="bg-brand-white border-brand-gray-100 fixed right-0 bottom-0 left-0 z-30 flex justify-end gap-3 border-t p-4 px-6">
          <Button
            variant="ghost"
            type="button"
            onClick={() => router.back()}
            size="md"
          >
            취소
          </Button>
          <Button
            type="submit"
            size="md"
            disabled={mutation.isPending}
            className="disabled:bg-brand-gray-200 text-md bg-brand-black px-10 py-6 font-bold text-white transition-all"
          >
            {submitButtonText}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
