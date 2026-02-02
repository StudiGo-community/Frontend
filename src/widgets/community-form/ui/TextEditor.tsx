'use client'

import { Tiptap, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import MenuBar from './MenuBar'
import WordCount from './WordCount'
// import MenuButton from './MenuButton'

export default function TextEditor() {
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
    content: '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'min-h-140 py-8 px-4 focus:outline-none prose dark:prose-invert max-w-none',
      },
    },
  })

  return (
    <div className="border-brand-gray-200 w-full rounded-lg border-2 p-4">
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
