'use client'

import { Control, Controller } from 'react-hook-form'
import { cn } from '@/shared/lib/cn'
import { Field, FieldError } from '@/shared/ui/Field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/Select'
import {
  POST_CATEGORIES,
  POST_CATEGORY_LABELS,
} from '@/entities/post/model/constants'
import { PostCreateForm } from '@/features/community-post-manage/model/post-create.schema'

const CATEGORY_OPTIONS = POST_CATEGORIES.map((category) => ({
  value: category,
  label: POST_CATEGORY_LABELS[category],
}))

interface CategoryFieldProps {
  control: Control<PostCreateForm>
}

export default function CategoryField({ control }: CategoryFieldProps) {
  return (
    <Controller
      name="category"
      control={control}
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
  )
}
