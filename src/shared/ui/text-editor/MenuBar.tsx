'use client'

import { useTiptap, useTiptapState } from '@tiptap/react'
import { menuBarStateSelector } from '@/shared/ui/text-editor/utils'
import HyperLink from '@/shared/ui/text-editor/HyperLink'
import ImageLink from '@/shared/ui/text-editor/ImageLink'
import YoutubeLink from '@/shared/ui/text-editor/YoutubeLink'
import MenuButton from '@/shared/ui/text-editor/MenuButton'
import { Separator } from '@/shared/ui/Separator'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Eraser,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  UnderlineIcon,
  Undo2,
} from 'lucide-react'

export default function MenuBar() {
  const { editor, isReady } = useTiptap()
  const editorState = useTiptapState(menuBarStateSelector)

  if (!isReady || !editor) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border-b-2 pb-4">
      {/* 히스토리 */}
      <MenuButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editorState.canUndo}
      >
        <Undo2 />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editorState.canRedo}
      >
        <Redo2 />
      </MenuButton>

      <Separator orientation="vertical" className="mx-2 h-8" />

      {/* 스타일 초기화 */}
      <MenuButton
        onClick={() => {
          editor.chain().focus().unsetAllMarks().run()
          editor.chain().focus().clearNodes().run()
        }}
      >
        <Eraser />
      </MenuButton>

      <Separator orientation="vertical" className="mx-2 h-8" />

      {/* 텍스트 스타일 */}
      <MenuButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editorState.canBold}
        isActive={editorState.isBold}
      >
        <Bold />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editorState.canItalic}
        isActive={editorState.isItalic}
      >
        <Italic />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editorState.canStrike}
        isActive={editorState.isStrike}
      >
        <Strikethrough />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editorState.canUnderline}
        isActive={editorState.isUnderline}
      >
        <UnderlineIcon />
      </MenuButton>
      <MenuButton
        onClick={() =>
          editor.chain().focus().toggleHighlight({ color: '#74c0fc' }).run()
        }
        disabled={!editorState.canHighlight}
        isActive={editorState.isHighlight}
      >
        <Highlighter />
      </MenuButton>

      <Separator orientation="vertical" className="mx-2 h-8" />

      {/* 노드 */}
      <MenuButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editorState.isBulletList}
      >
        <List />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editorState.isOrderedList}
      >
        <ListOrdered />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editorState.isBlockquote}
      >
        <Quote />
      </MenuButton>

      <Separator orientation="vertical" className="mx-2 h-8" />

      {/* 헤딩 */}
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editorState.isHeading1}
      >
        <Heading1 />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editorState.isHeading2}
      >
        <Heading2 />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editorState.isHeading3}
      >
        <Heading3 />
      </MenuButton>

      <Separator orientation="vertical" className="mx-2 h-8" />

      {/* 정렬 */}
      <MenuButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        isActive={editorState.isAlignLeft}
      >
        <AlignLeft />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        isActive={editorState.isAlignCenter}
      >
        <AlignCenter />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        isActive={editorState.isAlignRight}
      >
        <AlignRight />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        isActive={editorState.isAlignJustify}
      >
        <AlignJustify />
      </MenuButton>

      <Separator orientation="vertical" className="mx-2 h-8" />

      {/* 구분선 */}
      <MenuButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus />
      </MenuButton>

      <Separator orientation="vertical" className="mx-2 h-8" />

      {/* 링크, 이미지, 유튜브 */}
      <HyperLink editor={editor} />
      <ImageLink editor={editor} />
      <YoutubeLink editor={editor} />
    </div>
  )
}
