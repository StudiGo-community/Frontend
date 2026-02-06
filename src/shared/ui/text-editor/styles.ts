import { cva } from 'class-variance-authority'

export const editorContentStyles = cva([
  // 기본
  'min-h-140 max-w-none px-4 py-8',
  'prose dark:prose-invert',
  'focus:outline-none',

  // Placeholder
  '[&_.is-editor-empty:first-child::before]:text-brand-gray-300',
  '[&_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]',
  '[&_.is-editor-empty:first-child::before]:float-left',
  '[&_.is-editor-empty:first-child::before]:h-0',
  '[&_.is-editor-empty:first-child::before]:pointer-events-none',

  // Image Resize
  '[&_[data-resize-wrapper]_img]:!my-0',
  '[&_[data-resize-handle]]:w-4',
  '[&_[data-resize-handle]]:h-4',
  '[&_[data-resize-handle]]:bg-transparent',
  '[&_[data-resize-handle]]:z-50',

  // Cursors
  '[&_[data-resize-handle="top-left"]]:cursor-nw-resize',
  '[&_[data-resize-handle="top-right"]]:cursor-ne-resize',
  '[&_[data-resize-handle="bottom-left"]]:cursor-sw-resize',
  '[&_[data-resize-handle="bottom-right"]]:cursor-se-resize',
])
