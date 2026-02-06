'use client'

import Youtube from '@tiptap/extension-youtube'
import { Editor } from '@tiptap/react'
import { TvMinimalPlay } from 'lucide-react'
import { useCallback, useState } from 'react'
import MenuButton from '@/shared/ui/text-editor/MenuButton'
import { Modal, ModalClose, ModalDescription } from '@/shared/ui/Modal'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input/Input'
import { formatUrl, validateUrl } from '@/shared/lib/url'

export const youtubeConfigure = Youtube.configure({
  controls: false,
  nocookie: true,
})

export default function YoutubeLink({ editor }: { editor: Editor }) {
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

    // 유튜브 URL 검증은 Tiptap Youtube extension이 내부적으로 처리하지만,
    // 기본 URL 구조 검증은 수행합니다.
    if (!validateUrl(formattedUrl)) {
      setError('유효하지 않은 URL 형식입니다.')
      return
    }

    setIsOpen(false)

    setTimeout(() => {
      editor.commands.setYoutubeVideo({
        src: formattedUrl,
        width: 640,
        height: 480,
      })
    }, 300)
  }, [editor, url])

  return (
    <>
      <MenuButton
        onClick={openModal}
        isActive={editor.isActive('youtube')}
        disabled={false}
      >
        <TvMinimalPlay />
      </MenuButton>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="유튜브 영상 첨부"
        size="sm"
      >
        <ModalDescription className="mb-4">
          유튜브 영상의 링크를 붙여넣기 하거나 입력해주세요.
        </ModalDescription>
        <div className="flex flex-col gap-1.5">
          <Input
            placeholder="유튜브 링크를 입력해주세요"
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
        <ul className="text-brand-gray-600 mt-3 list-inside list-disc text-xs">
          <li>유튜브 영상 링크만 등록 가능합니다.</li>
          <li>일부 공개 또는 비공개 영상은 재생되지 않을 수 있습니다.</li>
        </ul>
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
