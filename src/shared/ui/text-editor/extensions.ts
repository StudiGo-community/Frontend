import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { linkConfigure } from '@/shared/ui/text-editor/HyperLink'
import { youtubeConfigure } from '@/shared/ui/text-editor/YoutubeLink'
import { imageConfigure } from '@/shared/ui/text-editor/ImageLink'

export const baseExtensions = [
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
  linkConfigure,
  imageConfigure,
  youtubeConfigure,
]
