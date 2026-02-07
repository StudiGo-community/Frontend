'use client'

import { useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { Textarea } from '@/shared/ui/Textarea'
import { useForm, useWatch } from 'react-hook-form'
import {
  CommentCreateFormSchema,
  type CommentCreateForm,
} from '@/features/community-comment-manage/model/comment-create.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldError } from '@/shared/ui/Field'
import { cn } from '@/shared/lib/cn'
import { ConfirmModal } from '@/shared/ui/ConfirmModal'
import { useCreateCommentMutation } from '@/features/community-comment-manage/model/useCreateCommentMutation'

interface CommentFormProps {
  postId: number
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { mutate, isPending } = useCreateCommentMutation()

  const form = useForm<CommentCreateForm>({
    resolver: zodResolver(CommentCreateFormSchema),
    mode: 'onChange',
    defaultValues: {
      content: '',
    },
  })

  const content = useWatch({
    control: form.control,
    name: 'content',
  })

  const onSubmit = (data: CommentCreateForm) => {
    mutate(
      { postId, data },
      {
        onSuccess: () => {
          form.reset()
        },
        onSettled: () => {
          setIsOpen(false)
        },
      }
    )
  }

  return (
    <>
      <form
        id="comment-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 py-12"
      >
        <Field
          data-invalid={!!form.formState.errors.content}
          className={cn(
            'flex flex-col',
            !form.formState.errors.content && 'mb-7'
          )}
        >
          <Textarea
            {...form.register('content')}
            placeholder="댓글을 입력해주세요"
            className={cn(
              'min-h-40 resize-none px-6 py-4 focus-visible:ring-1',
              form.formState.errors.content &&
                'border-brand-error focus-visible:border-brand-error focus-visible:ring-brand-error border-2'
            )}
          />
          {form.formState.errors.content && (
            <FieldError errors={[form.formState.errors.content]} />
          )}
        </Field>

        <div className="flex justify-between gap-2">
          <span
            className={cn(
              'text-sm transition-colors',
              content.length > 500 ? 'text-brand-error' : 'text-brand-gray-400'
            )}
          >
            {content.length} / 500
          </span>
          <Button
            variant="secondary"
            type="button"
            size="sm"
            className="-translate-y-6 px-6 text-sm"
            onClick={form.handleSubmit(() => setIsOpen(true))}
            disabled={!content || isPending}
          >
            등록
          </Button>
        </div>
      </form>

      {/* 등록 확인 모달 */}
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => onSubmit(form.getValues())}
        title="알림"
        confirmText="등록"
        isPending={isPending}
      >
        댓글을 <span className="text-brand-third">등록</span> 하시겠습니까?
      </ConfirmModal>
    </>
  )
}
