import { ComponentProps, useEffect } from 'react'
import { cva } from 'class-variance-authority'
import { Tiptap, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import Placeholder from '@tiptap/extension-placeholder'
import { cn } from '@/shared/lib/cn'
import MenuBar from '@/shared/ui/text-editor/MenuBar'
import WordCount from '@/shared/ui/text-editor/WordCount'
import { linkConfigure } from '@/shared/ui/text-editor/HyperLink'

const editorContentStyles = cva([
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
])

interface TextEditorProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
}

export default function TextEditor({
  value,
  onChange,
  onBlur,
  className,
  ...props
}: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({
        HTMLAttributes: {
          class: 'bg-brand-side py-[3px]',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      linkConfigure,
      Image,
      Youtube,
      Placeholder.configure({
        placeholder: '내용을 입력하세요...',
      }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: editorContentStyles(),
      },
    },
    // 텍스트 에디터 내부에서 내용 변경할 때
    onUpdate: ({ editor }) => {
      if (editor.isEmpty) {
        onChange?.('')
      } else {
        onChange?.(JSON.stringify(editor.getJSON()))
      }
    },
    // 포커스 빠질때만 유효성 검사
    onBlur: () => {
      onBlur?.()
    },
  })

  // 텍스트 에디터 외부에서 변경한 내용을 안에 적용할 때
  useEffect(() => {
    if (!editor) return

    if (value === '' && !editor.isEmpty) {
      editor.commands.setContent('')
    }
  }, [editor, value])

  const isInvalid = props['aria-invalid'] === true

  return (
    <div
      className={cn(
        'border-brand-gray-200 w-full rounded-lg border-2 p-4',
        isInvalid && 'border-brand-error',
        className
      )}
      {...props}
    >
      <Tiptap instance={editor}>
        {/* TODO: 스켈레톤으로 바꾸기 */}
        <Tiptap.Loading>Loading editor...</Tiptap.Loading>
        {editor && (
          <>
            <MenuBar />
            <Tiptap.Content className="" />
            <WordCount />
            {/* 버블 메뉴: 블록 설정하면 바로 위에 팝업 */}
            {/* <Tiptap.BubbleMenu>
              <MenuButton>Bold</MenuButton>
              <MenuButton>Italic</MenuButton>
            </Tiptap.BubbleMenu> */}
          </>
        )}
      </Tiptap>
    </div>
  )
}
