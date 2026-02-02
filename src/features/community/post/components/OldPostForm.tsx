'use client'

import { useForm, FormProvider, Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import { postSchema, type PostFormData } from '@/shared/api/schema/postSchema'
import TipTapEditor from '@/features/community/post/components/editor/TipTapEditor'
import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/Select'

const CATEGORY_OPTIONS = [
  { label: '자유게시판', value: 'FREE' },
  { label: '모집게시판', value: 'RECRUIT' },
  { label: '학습게시판', value: 'STUDY' },
]

export default function OldPostForm({
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
      category: 'Free',
      content: '',
      thumbnail_url: null,
      images: [],
    },
  })

  const mutation = useMutation({
    mutationFn: async (formData: PostFormData) =>
      axios.post('/api/v1/posts', formData),
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

  let submitButtonText = isEditing ? '수정 완료' : '등록하기'
  if (mutation.isPending) submitButtonText = '등록 중...'

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className="bg-brand-white mx-auto flex max-w-300 flex-col gap-4 pt-4 pb-32"
      >
        <div className="flex flex-col gap-4">
          {/* TODO: 새로 만드는 폼에 옮겨가기 */}
          <Select>
            <SelectTrigger className="min-h-12 w-full cursor-pointer border-2 pr-2 pl-4 text-base sm:max-w-60">
              <SelectValue placeholder="카테고리를 선택해 주세요." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="border-brand-gray-100 border-b px-3 py-2 text-base">
                  카테고리
                </SelectLabel>
                {CATEGORY_OPTIONS.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={() => {}}
                    className="hover:bg-brand-gray-50 cursor-pointer px-4 py-2 text-base outline-none"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

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
