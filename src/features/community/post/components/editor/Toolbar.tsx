'use client'

import { Editor } from '@tiptap/react'
import {
  ImageIcon,
  Quote,
  Minus,
  FileUp,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react'
import { cn } from '@/shared/lib/cn'

export default function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null

  const addImage = () => {
    const url = window.prompt('이미지 URL을 입력하세요')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }

  const btnClass = (active: boolean) =>
    cn(
      'p-2 rounded transition-colors',
      active
        ? 'bg-brand-main/10 text-brand-main'
        : 'text-brand-gray-400 hover:bg-brand-gray-100'
    )

  return (
    <div className="sticky top-0 z-20 flex flex-col border-b bg-white">
      {/* 1단: 사진, 동영상 등 대형 버튼 (시안 기반) */}
      <div className="no-scrollbar flex items-center gap-1 overflow-x-auto border-b p-2">
        <ToolbarButton
          icon={<ImageIcon size={20} />}
          label="사진"
          onClick={addImage}
        />
        <ToolbarButton icon={<FileUp size={20} />} label="MYBOX" />
        <div className="mx-2 h-6 w-px bg-gray-200" />
        <ToolbarButton
          icon={<Quote size={20} />}
          label="인용구"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
        />
        <ToolbarButton
          icon={<Minus size={20} />}
          label="구분선"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
      </div>

      {/* 2단: 상세 서식 버튼 */}
      <div className="flex items-center gap-1 bg-gray-50/50 p-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive('bold'))}
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive('italic'))}
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={btnClass(editor.isActive('underline'))}
        >
          <UnderlineIcon size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={btnClass(editor.isActive('strike'))}
        >
          <Strikethrough size={18} />
        </button>
        <div className="mx-2 h-4 w-px bg-gray-300" />
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={btnClass(editor.isActive({ textAlign: 'left' }))}
        >
          <AlignLeft size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={btnClass(editor.isActive({ textAlign: 'center' }))}
        >
          <AlignCenter size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={btnClass(editor.isActive({ textAlign: 'right' }))}
        >
          <AlignRight size={18} />
        </button>
      </div>
    </div>
  )
}

function ToolbarButton({
  icon,
  label,
  onClick,
  active,
}: {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  active?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-14 min-w-14 flex-col items-center justify-center gap-1 rounded hover:bg-gray-100',
        active && 'text-brand-main bg-brand-main/5'
      )}
    >
      {icon}
      <span className="text-[10px] leading-none font-medium">{label}</span>
    </button>
  )
}
