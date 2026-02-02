'use client'

import { cn } from '@/shared/lib/cn'
import { Button } from '@/shared/ui/Button'
import { ReactNode } from 'react'

interface MenuButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  isActive?: boolean
  className?: string
}

export default function MenuButton({
  children,
  onClick,
  disabled,
  isActive,
  className,
}: MenuButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="md"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'border-brand-gray-200 hover:bg-brand-gray-100 h-auto rounded-sm border bg-transparent px-3 py-3 transition-all duration-200',
        className,
        isActive && 'bg-brand-gray-200'
      )}
    >
      {children}
    </Button>
  )
}
