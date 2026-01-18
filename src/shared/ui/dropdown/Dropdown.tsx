'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

import { cn } from '@/shared/lib/cn'
import ArrowDownIcon from '@/shared/ui/assets/arrow-down-icon.svg'

import {
  CONTENT_BASE_CLASS,
  ITEM_BASE_CLASS,
  DropdownSize,
  TRIGGER_BASE_CLASS,
  TRIGGER_SIZE_CLASS,
  VIEWPORT_CLASS,
} from '@/shared/ui/dropdown/dropdown-style'

function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root {...props} />
}

function SelectGroup(
  props: React.ComponentProps<typeof SelectPrimitive.Group>
) {
  return <SelectPrimitive.Group {...props} />
}

function SelectValue(
  props: React.ComponentProps<typeof SelectPrimitive.Value>
) {
  return <SelectPrimitive.Value {...props} />
}

const CheckMarkIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SelectTrigger({
  className,
  size = 'md',
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: DropdownSize
}) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        TRIGGER_BASE_CLASS,
        TRIGGER_SIZE_CLASS[size],
        'justify-between pr-4 pl-4',
        'data-placeholder:text-[#BFB7B7]',
        className
      )}
      {...props}
    >
      <span className="min-w-0 flex-1 truncate text-left">{children}</span>

      <SelectPrimitive.Icon asChild>
        <span className="ml-2 flex size-6 shrink-0 items-center justify-center">
          <ArrowDownIcon className="text-brand-gray-300 size-6 shrink-0" />
        </span>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = 'popper',
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> & {
  sideOffset?: number
}) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position={position}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          CONTENT_BASE_CLASS,
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className={cn(VIEWPORT_CLASS)}>
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn('text-brand-gray-300 px-2 py-1.5 text-xs', className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item className={cn(ITEM_BASE_CLASS, className)} {...props}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

      <span className="absolute right-2 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckMarkIcon className="text-brand-gray-400 size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={cn('bg-brand-gray-200 -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

const Dropdown = Object.assign(Select, {
  Content: SelectContent,
  Group: SelectGroup,
  Item: SelectItem,
  Label: SelectLabel,
  Separator: SelectSeparator,
  Trigger: SelectTrigger,
  Value: SelectValue,
})

export { Dropdown }
