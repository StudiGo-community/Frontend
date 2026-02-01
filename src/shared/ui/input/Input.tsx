'use client'

import React, { useImperativeHandle, useRef, useState } from 'react'
import { cva } from 'class-variance-authority'
import { InputGroup } from '@/shared/ui/input/InputGroup'
import { cn } from '@/shared/lib/cn'
import { CalendarIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import SearchIcon from '@/shared/ui/assets/search-icon.svg'

interface InputProps extends Omit<React.ComponentProps<'input'>, 'size'> {
  variant?: 'default' | 'warn' | 'disabled'
  size?: 'sm' | 'md' | 'lg'
}

const inputGroupVariants = cva(
  'px-6 bg-brand-white text-brand-black selection:bg-brand-black selection:text-brand-white border-brand-gray-300 rounded-brand-base transition-all',
  {
    variants: {
      variant: {
        default: 'bg-brand-white',
        warn: 'bg-brand-light text-brand-third border-transparent',
        disabled:
          'bg-brand-gray-100 text-brand-gray-300 border-transparent pointer-events-none cursor-not-allowed',
      },
      size: {
        sm: 'h-10 py-2',
        md: 'h-12 py-3',
        lg: 'h-14 py-4',
      },
    },
  }
)

const ICON_MAP = {
  search: SearchIcon,
  date: CalendarIcon,
  password: EyeIcon,
  passwordHidden: EyeOffIcon,
} as const

function Input({
  type = 'text',
  variant = 'default',
  size = 'md',
  disabled,
  className,
  ref,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const internalType = getInternalType(type, showPassword)
  const iconType = (
    type === 'password' && showPassword ? 'passwordHidden' : type
  ) as keyof typeof ICON_MAP
  const IconComponent = ICON_MAP[iconType]

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, [
    inputRef,
  ])

  const handleIconButtonClick = () => {
    if (disabled) return

    const input = inputRef.current
    if (!input) return

    if (type === 'password') {
      setShowPassword((prev) => !prev)
      return
    }
    if (type === 'date' && internalType === 'text') {
      input.type = 'date'
      input.disabled = false
      input.showPicker()
      return
    }
    if (type === 'date') {
      input.showPicker()
      return
    }
  }

  return (
    <InputGroup
      className={cn(
        inputGroupVariants({
          variant: disabled ? 'disabled' : variant,
          size,
        }),
        className
      )}
    >
      <InputGroup.Input
        type={internalType}
        className={cn(
          'placeholder:text-brand-gray-300 p-0 placeholder:text-base',
          {
            'placeholder:text-brand-third/50 selection:bg-brand-main':
              variant === 'warn',
            'placeholder:text-brand-gray-200': type === 'search',
            '[&::-webkit-calendar-picker-indicator]:hidden': type === 'date',
          }
        )}
        disabled={type === 'date' && internalType === 'text' ? true : disabled}
        ref={inputRef}
        {...props}
      />
      {IconComponent && (
        <InputGroup.Addon align={'inline-end'} className="p-0">
          <InputGroup.IconButton
            className="text-brand-gray-300"
            onClick={handleIconButtonClick}
          >
            <IconComponent strokeWidth={2.5} className="size-4.5" />
          </InputGroup.IconButton>
        </InputGroup.Addon>
      )}
    </InputGroup>
  )
}

const getInternalType = (
  type: React.HTMLInputTypeAttribute,
  showPassword: boolean
) => {
  switch (type) {
    case 'search':
    case 'date':
      return 'text'
    case 'password':
      if (showPassword) return 'text'
    default:
      return type
  }
}

export { Input, inputGroupVariants }
