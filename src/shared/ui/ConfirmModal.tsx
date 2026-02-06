'use client'

import React from 'react'
import { Modal, ModalClose, ModalDescription } from '@/shared/ui/Modal'
import { Button, ButtonVariants } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: React.ReactNode
  confirmText?: string
  isPending?: boolean
  children: React.ReactNode
  submit?: boolean
  formId?: string
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = '알림',
  description,
  confirmText = '확인',
  isPending,
  children,
  submit,
  formId,
}: ConfirmModalProps) {
  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      contentClassName="flex flex-col items-center"
    >
      <div
        className={cn(
          'text-center text-base font-semibold break-keep',
          description ? 'mb-0.5' : 'mb-8'
        )}
      >
        {children}
      </div>

      <ModalDescription
        className={cn(
          'text-brand-gray-500 text-sm font-medium',
          description ? 'mb-8' : 'sr-only'
        )}
      >
        {description || title}
      </ModalDescription>

      <div className="flex gap-2">
        <ModalClose
          className={cn(
            ButtonVariants({ variant: 'outline', size: 'md' }),
            'px-10'
          )}
          disabled={isPending}
        >
          취소
        </ModalClose>
        <Button
          size="md"
          className="bg-brand-main px-10"
          onClick={onConfirm}
          disabled={isPending}
          type={submit ? 'submit' : 'button'}
          form={formId}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  )
}
