import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'

export const extensions = [
  StarterKit.configure({
    heading: { levels: [1, 2, 3] },
    blockquote: {},
    horizontalRule: {},
  }),
  // Markdown.configure({
  //   html: false,
  //   tightLists: true,
  // }),
  Placeholder.configure({
    placeholder: '내용을 입력하세요.',
  }),
  Image.configure({
    inline: false,
    allowBase64: true,
  }),
  Link.configure({
    openOnClick: false,
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Underline,
]
