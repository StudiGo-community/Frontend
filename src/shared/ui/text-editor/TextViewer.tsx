'use client'

import { useEffect } from 'react'
import { useEditor, Tiptap } from '@tiptap/react'
import { baseExtensions } from '@/shared/ui/text-editor/extensions'
import { editorContentStyles } from '@/shared/ui/text-editor/styles'
import { tryParseJson } from '@/shared/ui/text-editor/utils'

interface TextViewerProps {
  content?: string
  className?: string
}

export default function TextViewer({ content, className }: TextViewerProps) {
  const editor = useEditor({
    extensions: baseExtensions,
    content: tryParseJson(content),
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: editorContentStyles(),
      },
    },
  })

  // 데이터가 변경될 때 에디터 내용 업데이트 (그럴일은 없지만)
  useEffect(() => {
    if (!editor || !content) return
    const parsed = tryParseJson(content)
    if (JSON.stringify(editor.getJSON()) !== JSON.stringify(parsed)) {
      editor.commands.setContent(parsed)
    }
  }, [editor, content])

  if (!editor) {
    return null
  }

  return (
    <Tiptap instance={editor}>
      <Tiptap.Content className={className} />
    </Tiptap>
  )
}
