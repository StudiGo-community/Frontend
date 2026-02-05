'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'

import { cn } from '@/shared/lib/cn'

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  maxWidthClassName,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  maxWidthClassName: string
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          'rounded-brand-xl shadow-brand-md bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] gap-7 border-none px-6 py-6.5 duration-200 outline-none',
          'flex flex-col',
          'w-[calc(100%-6rem)]',
          maxWidthClassName,
          'max-h-[80vh]',
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({
  hasUnderline,
  className,
  ...props
}: React.ComponentProps<'div'> & { hasUnderline: boolean }) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        'flex items-center justify-between pb-5',
        { 'border-b-brand-gray-200 border-b': hasUnderline },
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        'text-start text-base leading-none font-semibold',
        className
      )}
      {...props}
    />
  )
}

function ModalDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="modal-description"
      className={cn('text-brand-gray-600 text-sm', className)}
      {...props}
    />
  )
}

interface ModalProps {
  isOpen?: boolean
  onClose?: () => void
  trigger?: React.ReactNode
  title: string
  hasHeaderUnderline?: boolean
  size?: keyof typeof MODAL_MAX_WIDTH_MAP
  contentClassName?: string
  children: React.ReactNode
}

const MODAL_MAX_WIDTH_MAP = {
  sm: 'max-w-100',
  md: 'max-w-116',
  lg: 'max-w-150',
} as const

function Modal({
  isOpen,
  onClose,
  trigger,
  title,
  size = 'md',
  hasHeaderUnderline = true,
  contentClassName,
  children,
}: ModalProps) {
  const handleOpenChange = (open: boolean) => {
    if (!open) onClose?.()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent maxWidthClassName={MODAL_MAX_WIDTH_MAP[size]}>
        <DialogHeader hasUnderline={hasHeaderUnderline}>
          <DialogTitle>{title}</DialogTitle>
          <DialogClose>
            <XIcon
              className="text-brand-gray-500 size-5 cursor-pointer"
              strokeWidth={1.5}
            />
          </DialogClose>
        </DialogHeader>
        <div className={cn('flex-1 overflow-y-auto', contentClassName)}>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}

const ModalClose = DialogClose

export { Modal, ModalClose, ModalDescription }
