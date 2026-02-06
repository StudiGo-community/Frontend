'use client'

import React, { useEffect } from 'react'
import { Modal, ModalClose, ModalDescription } from '@/shared/ui/Modal'
import { Button, ButtonVariants } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ReportForm,
  ReportFormSchema,
} from '@/features/community-report/model/schema'
import { Textarea } from '@/shared/ui/Textarea'

interface ReportModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (reason: string) => void
  title: string
  targetName: string
  isPending?: boolean
}

export function ReportModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  targetName,
  isPending,
}: ReportModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ReportForm>({
    resolver: zodResolver(ReportFormSchema),
    mode: 'onChange',
    defaultValues: {
      reason: '',
    },
  })

  useEffect(() => {
    if (isOpen) {
      reset()
    }
  }, [isOpen, reset])

  const onFormSubmit = (data: ReportForm) => {
    onConfirm(data.reason)
  }

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      contentClassName="flex flex-col items-center"
    >
      <div className="text-center text-base font-semibold break-keep">
        {targetName}을 <span className="text-brand-third">신고</span>{' '}
        하시겠습니까?
      </div>

      <ModalDescription className="sr-only">신고 사유 입력</ModalDescription>

      <form
        id="report-form"
        onSubmit={handleSubmit(onFormSubmit)}
        className="my-4 flex w-full flex-col gap-1"
      >
        <Textarea
          {...register('reason')}
          placeholder="신고 사유를 입력해주세요. (최대 100자)"
          className={cn(
            'h-28 resize-none p-3 focus-visible:ring-0',
            !errors.reason ? 'mb-5' : 'border-brand-error'
          )}
        />
        {errors.reason && (
          <span className="text-brand-error text-xs font-medium">
            {errors.reason.message}
          </span>
        )}
      </form>

      <div className="flex gap-2">
        <ModalClose
          className={cn(
            ButtonVariants({ variant: 'outline', size: 'md' }),
            'px-10'
          )}
          disabled={isPending}
          onClick={onClose}
        >
          취소
        </ModalClose>
        <Button
          type="submit"
          form="report-form"
          size="md"
          className="bg-brand-main px-10"
          disabled={isPending || !isValid}
        >
          신고
        </Button>
      </div>
    </Modal>
  )
}
