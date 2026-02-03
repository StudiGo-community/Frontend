import { cva } from 'class-variance-authority'
import type { Editor } from '@tiptap/core'
import type { EditorStateSnapshot } from '@tiptap/react'

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

export function menuBarStateSelector(ctx: EditorStateSnapshot<Editor>) {
  return {
    // 히스토리
    canUndo: ctx.editor.can().chain().undo().run() ?? false,
    canRedo: ctx.editor.can().chain().redo().run() ?? false,

    // 스타일 제거
    canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,

    // 텍스트
    isBold: ctx.editor.isActive('bold') ?? false,
    canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
    isItalic: ctx.editor.isActive('italic') ?? false,
    canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
    isStrike: ctx.editor.isActive('strike') ?? false,
    canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
    isUnderline: ctx.editor.isActive('underline') ?? false,
    canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
    isHighlight: ctx.editor.isActive('highlight') ?? false,
    canHighlight: ctx.editor.can().chain().toggleHighlight().run() ?? false,

    // 노드
    isBulletList: ctx.editor.isActive('bulletList') ?? false,
    isOrderedList: ctx.editor.isActive('orderedList') ?? false,
    isBlockquote: ctx.editor.isActive('blockquote') ?? false,

    // 제목
    isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
    isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
    isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,

    // 정렬
    isAlignLeft: ctx.editor.isActive({ textAlign: 'left' }) ?? false,
    isAlignCenter: ctx.editor.isActive({ textAlign: 'center' }) ?? false,
    isAlignRight: ctx.editor.isActive({ textAlign: 'right' }) ?? false,
    isAlignJustify: ctx.editor.isActive({ textAlign: 'justify' }) ?? false,
  }
}

export type MenuBarState = ReturnType<typeof menuBarStateSelector>
