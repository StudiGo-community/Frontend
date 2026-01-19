export type DropdownSize = 'md' | 'lg'

export const TRIGGER_SIZE_CLASS: Record<DropdownSize, string> = {
  md: 'w-full max-w-96 h-12',
  lg: 'w-full max-w-lg h-12',
}

export const TRIGGER_BASE_CLASS = `
  flex items-center whitespace-nowrap select-none
  text-sm
  rounded-brand-base border
  bg-brand-white border-brand-gray-200 text-brand-gray-500
  outline-none focus-visible:ring-0 focus-visible:border-brand-gray-300
  disabled:cursor-not-allowed disabled:opacity-50
`

export const CONTENT_BASE_CLASS = `
  relative z-50 overflow-hidden rounded-brand-base border shadow-brand-md
  bg-brand-white border-brand-gray-200 text-brand-gray-500
  max-h-60 overflow-y-auto
  data-[state=open]:animate-in data-[state=closed]:animate-out
  data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
  data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
  data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
  data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
`

export const ITEM_BASE_CLASS = `
  relative flex w-full cursor-default select-none items-center rounded-brand-sm
  py-2 pl-3 pr-8 text-sm
  data-[disabled]:pointer-events-none data-[disabled]:opacity-50
  focus:bg-brand-gray-100 focus:text-brand-gray-500
`

export const VIEWPORT_CLASS = 'p-1 min-w-(--radix-select-trigger-width)'
