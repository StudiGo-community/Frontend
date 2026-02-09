'use client'

import { useEffect, useRef, useState } from 'react'
import { Modal } from '@/shared/ui/Modal'
import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'

import ErrorIcon from '@/features/mypage-my-information-fix/assets/error-icon.svg'

interface WithdrawConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isPending: boolean
}

export function WithdrawConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isPending,
}: WithdrawConfirmModalProps) {
  const [enabled, setEnabled] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!isOpen) return

    timerRef.current = setTimeout(() => {
      setEnabled(true)
    }, 3000)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isOpen])

  const handleClose = () => {
    if (isPending) return

    setEnabled(false)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    onClose()
  }

  const handleConfirm = () => {
    if (isPending) return

    setEnabled(false)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    onConfirm()
  }

  if (!isOpen) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="알림"
      size="sm"
      hasHeaderUnderline={false}
      contentClassName="flex flex-col items-center"
    >
      <div className="mt-1 flex items-center justify-center">
        <ErrorIcon className="h-10 w-10" aria-hidden />
      </div>

      <p className="text-brand-black mt-3 text-lg font-bold">
        정말로 탈퇴하시겠습니까?
      </p>
      <p className="text-brand-gray-400 mt-2 text-sm">
        탈퇴 후 계정을 복구 할 수 없습니다.
      </p>

      <div className="mt-6 flex w-full gap-3">
        <Button
          type="button"
          variant="outline"
          size="md"
          className="flex-1"
          onClick={handleClose}
          disabled={isPending}
        >
          취소
        </Button>

        <Button
          type="button"
          variant="primary"
          size="md"
          className={cn('flex-1', 'bg-brand-main hover:bg-brand-main/90')}
          onClick={handleConfirm}
          disabled={!enabled || isPending}
        >
          탈퇴하기
        </Button>
      </div>
    </Modal>
  )
}
