'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { extensions } from './Extensions'
import { useEffect } from 'react'
import Toolbar from './Toolbar'

export default function TipTapEditor({
  content,
  onChange,
}: {
  content: string
  onChange: (val: string) => void
}) {
  const editor = useEditor({
    extensions: [...extensions],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'focus:outline-none min-h-[400px] p-8 prose prose-zinc max-w-none',
      },
    },
    onUpdate: ({ editor }) => {
      // ✅ @ts-expect-error 뒤에 구체적인 이유를 덧붙입니다.
      // @ts-expect-error: tiptap-markdown storage property is not typed in core
      const markdown = editor.storage.markdown.getMarkdown()
      onChange(markdown)
    },
  })

  useEffect(() => {
    if (!editor) return
    // ✅ 린트 규칙에 따라 3자 이상의 설명을 포함합니다.
    // @ts-expect-error: markdown extension types are missing in editor instance
    const currentMarkdown = editor.storage.markdown.getMarkdown()
    if (content !== currentMarkdown) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!editor) return null

  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-[#E5E5E5] bg-white shadow-sm">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
