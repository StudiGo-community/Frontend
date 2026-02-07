import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'

const serverExtensions = [
  StarterKit.configure({
    link: false,
  }),
  Highlight.configure({
    HTMLAttributes: {
      class: 'bg-brand-side py-[3px]',
    },
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Link.configure({
    HTMLAttributes: {
      class: 'text-brand-second underline cursor-pointer',
    },
    linkOnPaste: true,
    defaultProtocol: 'https',
    protocols: ['http', 'https'],
  }),
  Image.extend({
    addAttributes() {
      return {
        ...this.parent?.(),
        referrerPolicy: {
          default: 'no-referrer',
          parseHTML: (element) => element.getAttribute('referrerPolicy'),
          renderHTML: (attributes) => {
            return {
              referrerPolicy: attributes.referrerPolicy,
            }
          },
        },
      }
    },
  }).configure({
    inline: false,
    allowBase64: true,
  }),
  Youtube.configure({
    controls: false,
    nocookie: true,
  }),
]

export const convertJsonToHtml = (content: string) => {
  try {
    const json = JSON.parse(content)
    return generateHTML(json, serverExtensions)
  } catch (error) {
    console.error(error)
    return ''
  }
}
