import { Tiptap, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import MenuBar from './MenuBar'
import WordCount from './WordCount'
import { ComponentProps } from 'react'
import { cn } from '@/shared/lib/cn'

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
      Image,
      Youtube,
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'min-h-140 py-8 px-4 focus:outline-none prose dark:prose-invert max-w-none',
      },
    },
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
