'use client'

import { cn } from '@/shared/lib/cn'
import { Button, ButtonVariants } from '@/shared/ui/Button'
import { Dropdown } from '@/shared/ui/dropdown'
import { Modal, ModalClose } from '@/shared/ui/Modal'
import Image from 'next/image'
import { useState } from 'react'

interface ChatRoomEnterModalProps {
  isOpen: boolean
  onClose: () => void
}

const PROFILE_IMAGE_COUNT = 8
const PROFILE_IMAGE_KEYS = Array.from(
  { length: PROFILE_IMAGE_COUNT },
  (_, index) => `default_${index + 1}`
)

function ChatRoomEnterModal({ isOpen, onClose }: ChatRoomEnterModalProps) {
  const [selectedImageKey, setSelectedImageKey] = useState('')

  const handleImageKeyChange = (value: string) => setSelectedImageKey(value)

  return (
    <Modal
      title="프로필 설정"
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="flex flex-col items-center justify-center"
    >
      <Dropdown value={selectedImageKey} onValueChange={handleImageKeyChange}>
        <Dropdown.Trigger className="h-40">
          <Dropdown.Value placeholder="프로필 이미지를 선택해주세요" />
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Group>
            {PROFILE_IMAGE_KEYS.map((key) => (
              <Dropdown.Item key={key} value={key}>
                <Image
                  src={getProfileImageUrl(key)}
                  alt={`기본 프로필 이미지 ${key.split('_')[1]}`}
                  width={140}
                  height={140}
                />
              </Dropdown.Item>
            ))}
          </Dropdown.Group>
        </Dropdown.Content>
      </Dropdown>
      <div className="mt-6 flex items-center justify-center gap-2.5">
        <ModalClose
          className={cn(ButtonVariants({ variant: 'outline', size: 'md' }))}
        >
          취소
        </ModalClose>
        <Button variant="primary" size="md" disabled={!selectedImageKey}>
          확인
        </Button>
      </div>
    </Modal>
  )
}

export default ChatRoomEnterModal

const getProfileImageUrl = (key: string) =>
  `/images/chat/profiles/default-${key.split('_')[1]}.webp`
