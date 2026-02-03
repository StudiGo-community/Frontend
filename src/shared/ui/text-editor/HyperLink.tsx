'use client'

import Link from '@tiptap/extension-link'
import { Editor } from '@tiptap/react'
import { Link as LinkIcon } from 'lucide-react'
import { useCallback, useState } from 'react'
import MenuButton from '@/shared/ui/text-editor/MenuButton'
import { Modal, ModalClose } from '@/shared/ui/Modal'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input/Input'

// configure가 길어서 여기에 작성 후 에디터에서 임포트해서 사용하기
export const linkConfigure = Link.configure({
  HTMLAttributes: {
    class: 'text-brand-second underline cursor-pointer',
  },
  // autolink: false,
  linkOnPaste: true,
  defaultProtocol: 'https',
  protocols: ['http', 'https'],
  // 링크 유효성 검사 (보안)
  isAllowedUri: (url, ctx) => {
    try {
      // URL 생성
      const parsedUrl = url.includes(':')
        ? new URL(url)
        : new URL(`${ctx.defaultProtocol}://${url}`)

      // 기본 유효성 검사 (Tiptap 내장 검증)
      if (!ctx.defaultValidate(parsedUrl.href)) {
        return false
      }

      // 금지된 프로토콜 (XSS)
      const disallowedProtocols = ['ftp', 'file', 'mailto']
      const protocol = parsedUrl.protocol.replace(':', '')

      if (disallowedProtocols.includes(protocol)) {
        return false
      }

      // 허용된 프로토콜인지 2차 확인 (위의 protocols 배열과 대조)
      const allowedProtocols = ctx.protocols.map((p) =>
        typeof p === 'string' ? p : p.scheme
      )

      if (!allowedProtocols.includes(protocol)) {
        return false
      }

      // 필요시 도메인 차단
      // const disallowedDomains = ['example-phishing.com', 'malicious-site.net'];
      // const domain = parsedUrl.hostname;

      // if (disallowedDomains.includes(domain)) {
      //   return false;
      // }

      // 다 통과하면 true 반환
      return true
    } catch {
      return false
    }
  },
})

export default function HyperLink({ editor }: { editor: Editor }) {
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState('')

  const openModal = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    setUrl(previousUrl || '')
    setIsOpen(true)
  }, [editor])

  const handleSave = useCallback(() => {
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      setIsOpen(false)
      return
    }

    // URL 포맷팅
    let formattedUrl = url.trim()
    if (!formattedUrl.includes('://')) {
      if (formattedUrl.startsWith('www.')) {
        formattedUrl = formattedUrl.slice(4)
      }
      formattedUrl = `https://${formattedUrl}`
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      setIsOpen(false)
      return
    }

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: formattedUrl })
      .run()

    setIsOpen(false)
  }, [editor, url])

  return (
    <>
      <MenuButton onClick={openModal} isActive={editor.isActive('link')}>
        <LinkIcon />
      </MenuButton>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="링크 등록"
        size="sm"
      >
        <Input
          placeholder="URL을 입력해주세요"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave()
          }}
        />
        <div className="mt-6 flex justify-end gap-2">
          <ModalClose asChild>
            <Button variant="ghost" size="sm">
              취소
            </Button>
          </ModalClose>
          <Button variant="secondary" size="sm" onClick={handleSave}>
            확인
          </Button>
        </div>
      </Modal>
    </>
  )
}
