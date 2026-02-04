'use client'

import Image from '@tiptap/extension-image'
import { Editor } from '@tiptap/react'
import { ImageIcon } from 'lucide-react'
import { useCallback, useState } from 'react'
import MenuButton from '@/shared/ui/text-editor/MenuButton'
import { Modal, ModalClose, ModalDescription } from '@/shared/ui/Modal'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input/Input'
import { formatUrl, validateUrl } from '@/shared/lib/url'

export const imageConfigure = Image.configure({
  inline: false,
  allowBase64: true,
  resize: {
    enabled: true,
    alwaysPreserveAspectRatio: true,
  },
})

export default function ImageLink({ editor }: { editor: Editor }) {
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [error, setError] = useState<string | null>(null)

  const openModal = useCallback(() => {
    setUrl('')
    setError(null)
    setIsOpen(true)
  }, [])

  const handleSave = useCallback(() => {
    if (url === '') {
      setIsOpen(false)
      return
    }

    const formattedUrl = formatUrl(url)

    if (!validateUrl(formattedUrl)) {
      setError('유효하지 않은 URL 형식입니다.')
      return
    }

    setIsOpen(false)

    setTimeout(() => {
      editor.chain().setImage({ src: formattedUrl }).focus().run()
    }, 300)
  }, [editor, url])

  return (
    <>
      <MenuButton
        onClick={openModal}
        isActive={editor.isActive('image')}
        disabled={false}
      >
        <ImageIcon />
      </MenuButton>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="이미지 첨부"
        size="sm"
      >
        <ModalDescription className="mb-4">
          이미지의 링크를 붙여넣기 하거나 입력해주세요.
        </ModalDescription>
        <div className="flex flex-col gap-1.5">
          <Input
            placeholder="이미지 주소를 입력해주세요 (https://...)"
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
