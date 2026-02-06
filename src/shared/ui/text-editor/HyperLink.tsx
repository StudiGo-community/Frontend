'use client'

import Link from '@tiptap/extension-link'
import { Editor } from '@tiptap/react'
import { Link as LinkIcon } from 'lucide-react'
import { useCallback, useState } from 'react'
import MenuButton from '@/shared/ui/text-editor/MenuButton'
import { Modal, ModalClose, ModalDescription } from '@/shared/ui/Modal'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input/Input'
import { formatUrl, validateUrl } from '@/shared/lib/url'

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
    // 기본 Tiptap 검증 + 커스텀 프로토콜 검증
    const isValid = validateUrl(url, ctx.defaultProtocol)
    if (!isValid) return false

    // Tiptap 내부 검증도 통과시켜야 함
    try {
      const parsedUrl = url.includes(':')
        ? new URL(url)
        : new URL(`${ctx.defaultProtocol}://${url}`)
      return ctx.defaultValidate(parsedUrl.href)
    } catch {
      return false
    }
  },
})

export default function HyperLink({ editor }: { editor: Editor }) {
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [error, setError] = useState<string | null>(null)

  const openModal = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    setUrl(previousUrl || '')
    setError(null)
    setIsOpen(true)
  }, [editor])

  const handleSave = useCallback(() => {
    // 빈 URL이면 링크 삭제
    if (url === '') {
      setIsOpen(false)
      setTimeout(() => {
        editor.chain().focus().extendMarkRange('link').unsetLink().run()
      }, 300)
      return
    }

    // URL 포맷팅 및 검증
    const formattedUrl = formatUrl(url)
    if (!validateUrl(formattedUrl)) {
      setError('유효하지 않은 URL 형식입니다.')
      return
    }

    setIsOpen(false)
    setTimeout(() => {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: formattedUrl })
        .run()
    }, 300)
  }, [editor, url])

  return (
    <>
      <MenuButton onClick={openModal} isActive={editor.isActive('link')}>
        <LinkIcon />
      </MenuButton>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="링크 첨부"
        size="sm"
      >
        <ModalDescription className="mb-4">
          이동할 페이지의 링크를 붙여넣기 하거나 입력해주세요.
        </ModalDescription>
        <div className="flex flex-col gap-1.5">
          <Input
            placeholder="URL을 입력해주세요"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value)
              setError(null)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave()
            }}
            className={
              error ? 'border-brand-error focus:border-brand-error' : ''
            }
            autoFocus
          />
          {error && <span className="text-brand-error text-xs">{error}</span>}
        </div>
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
