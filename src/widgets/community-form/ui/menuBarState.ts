import type { Editor } from '@tiptap/core'
import type { EditorStateSnapshot } from '@tiptap/react'

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
  }
}

export type MenuBarState = ReturnType<typeof menuBarStateSelector>
