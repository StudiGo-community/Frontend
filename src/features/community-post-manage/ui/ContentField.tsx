'use client'

import { Control, Controller } from 'react-hook-form'
import { cn } from '@/shared/lib/cn'
import { Field, FieldError } from '@/shared/ui/Field'
import TextEditor from '@/shared/ui/text-editor/TextEditor'
import { PostCreateForm } from '@/features/community-post-manage/model/post-create.schema'

interface ContentFieldProps {
  control: Control<PostCreateForm>
}

export default function ContentField({ control }: ContentFieldProps) {
  return (
    <Controller
      name="content"
      control={control}
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
  )
}
