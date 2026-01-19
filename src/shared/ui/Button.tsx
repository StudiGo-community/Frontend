'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/cn'

/**
 * 버튼 스타일 정의 (Tailwind v4 & Design Tokens)
 * - Trigger: 핵심 기능을 실행시키는 액션 (Red)
 * - Confirm: 결정을 확정 짓는 액션 (Black)
 * - Revoke: 취소하거나 해제하는 보조 액션 (Outline)
 */
const ButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-brand-base text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary: 'bg-brand-main text-white hover:bg-brand-main/90 font-bold',
        secondary:
          'bg-brand-black text-white hover:bg-brand-black/90 font-bold',
        outline:
          'border border-brand-gray-300 bg-white text-brand-black hover:bg-brand-gray-50 font-bold',
        ghost:
          'bg-brand-gray-100 text-brand-gray-400 hover:bg-brand-gray-200 font-medium',
      },
      size: {
        reg: 'h-[56px] px-8 text-base',
        md: 'h-[48px] px-6 text-sm',
        sm: 'h-[40px] px-4 text-xs',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'reg',
    },
  }
)

/**
 * shadcn v4의 타입 정의 방식 적용
 * interface를 사용하면서 React.ComponentProps<'button'>을 확장
 */
export interface ButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof ButtonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(ButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, ButtonVariants }
