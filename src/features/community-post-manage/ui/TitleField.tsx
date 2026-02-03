'use client'

import { FieldError as RHFFieldError, UseFormRegister } from 'react-hook-form'
import { cn } from '@/shared/lib/cn'
import { Field, FieldError } from '@/shared/ui/Field'
import { Input } from '@/shared/ui/input'
import { PostCreateForm } from '@/features/community-post-manage/model/post-create.schema'

interface TitleFieldProps {
  register: UseFormRegister<PostCreateForm>
  error?: RHFFieldError
}

export default function TitleField({ register, error }: TitleFieldProps) {
  return (
    <Field data-invalid={!!error}>
      <Input
        {...register('title')}
        aria-invalid={!!error}
        placeholder="제목을 입력해 주세요."
        autoComplete="off"
        className={cn(
          'placeholder:text-brand-gray-300 border-brand-gray-200! text-md mb-7 rounded-lg border-2 p-4 font-medium transition-none',
          error && 'border-brand-error! mb-0'
        )}
      />
      {error && <FieldError errors={[error]} />}
    </Field>
  )
}
