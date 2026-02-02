'use client'

// TODO: 컴포넌트 분리 후 경로 수정
import { useTiptap, useTiptapState } from '@tiptap/react'
import { menuBarStateSelector } from './menuBarState'
import MenuButton from './MenuButton'
import { Separator } from '@/shared/ui/Separator'
import {
  Bold,
  Eraser,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ImageIcon,
  Italic,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  TvMinimalPlay,
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

      <MenuButton
        onClick={() => {
          editor.chain().focus().unsetAllMarks().run()
          editor.chain().focus().clearNodes().run()
        }}
      >
        <Eraser />
      </MenuButton>

      <Separator orientation="vertical" className="mx-2 h-8" />

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

      <MenuButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus />
      </MenuButton>

      <Separator orientation="vertical" className="mx-2 h-8" />

      {/* 링크 (스타터키트에 있음), 이미지, 유튜브 추가 */}
      {/* TODO: 링크 추가 */}

      {/* TODO: 이미지 업로드 기능 추가 */}
      <MenuButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .setImage({ src: 'https://placehold.co/800x400' })
            .run()
        }
      >
        <ImageIcon />
      </MenuButton>
      {/* TODO: 모달 띄워서 주소 입력창 띄우기 */}
      <MenuButton
        onClick={() =>
          editor.commands.setYoutubeVideo({
            src: 'https://youtu.be/F2Mx-u7auUs?si=B5RabshHgu6YN9Ai',
          })
        }
      >
        <TvMinimalPlay />
      </MenuButton>
    </div>
  )
}
