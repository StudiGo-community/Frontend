'use client'

import {
  POST_CATEGORIES,
  POST_CATEGORY_LABELS,
} from '@/entities/post/model/constants'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  PostCreateForm,
  PostCreateFormSchema,
} from '@/features/community-post-manage/model/post-create.schema'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/Select'
import { Input } from '@/shared/ui/input'
import { cn } from '@/shared/lib/cn'
import { Button } from '@/shared/ui/Button'
import { useRouter } from 'next/navigation'
import { Field, FieldError } from '@/shared/ui/Field'
import TextEditor from './TextEditor'

const CATEGORY_OPTIONS = POST_CATEGORIES.map((category) => ({
  value: category,
  label: POST_CATEGORY_LABELS[category],
}))

// TODO: defaultValues 인자로 받아오기
export default function PostForm() {
  const router = useRouter()

  const form = useForm<PostCreateForm>({
    resolver: zodResolver(PostCreateFormSchema),
    defaultValues: {
      title: '',
      content: '',
      category: undefined,
      // thumbnailUrl: null,
      // images: [],
    },
  })

  const onSubmit = (data: PostCreateForm) => {
    // data.content = content
    console.log(data)
  }

  return (
    <form
      id="community-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="mb-20 flex flex-col gap-2"
    >
      {/* 카테고리 */}
      <Controller
        name="category"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <Select
              {...field}
              value={field.value || ''}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                aria-invalid={fieldState.invalid}
                className={cn(
                  'border-brand-gray-200 mb-7 min-h-12 w-full cursor-pointer border-2 pr-2 pl-4 text-base sm:max-w-60',
                  fieldState.error && 'mb-0'
                )}
              >
                <SelectValue placeholder="카테고리를 선택해 주세요." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="border-brand-gray-100 border-b px-3 py-2 text-base">
                    카테고리
                  </SelectLabel>
                  {CATEGORY_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className={cn(
                        'hover:bg-brand-gray-50 cursor-pointer px-4 py-2 text-base outline-none',
                        fieldState.error && 'border-brand-error'
                      )}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* 제목 */}
      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="제목을 입력해 주세요."
              autoComplete="off"
              className={cn(
                'placeholder:text-brand-gray-300 border-brand-gray-200! text-md mb-7 rounded-lg border-2 p-4 font-medium transition-none',
                fieldState.error && 'border-brand-error! mb-0'
              )}
            />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* 내용 */}
      <Controller
        name="content"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <TextEditor
              {...field}
              aria-invalid={fieldState.invalid}
              className={cn(fieldState.error && 'border-brand-error mb-0')}
            />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* 하단 고정 풋터 */}
      <div className="bg-brand-white border-brand-gray-100 fixed right-0 bottom-0 left-0 z-30 flex justify-end gap-3 border-t p-4 px-6">
        <Button
          variant="ghost"
          type="button"
          onClick={() => router.back()}
          size="md"
        >
          취소하기
        </Button>
        <Button
          variant="ghost"
          type="button"
          onClick={() => form.reset()}
          size="md"
        >
          다시쓰기
        </Button>
        <Button
          form="community-form"
          type="submit"
          size="md"
          // disabled={mutation.isPending}
          className="disabled:bg-brand-gray-200 text-md bg-brand-black px-10 py-6 font-bold text-white transition-all"
        >
          등록하기
        </Button>
      </div>
    </form>
  )
}
