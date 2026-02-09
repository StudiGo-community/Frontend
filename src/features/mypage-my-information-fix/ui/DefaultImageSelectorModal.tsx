'use client'

import Image from 'next/image'

import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'

import { DEFAULT_PROFILE_IMAGE_URL_LIST } from '@/entities/mypage-my-information-fix/model/default-profile-images'
import { normalizeImageSrcForNextImage } from '@/entities/mypage-my-information-fix/lib/normalize-image-src'

interface DefaultImageSelectorModalProps {
  selectedProfileImageUrl: string
  onClose: () => void
  onSelect: (profileImageUrl: string) => void
}

export function DefaultImageSelectorModal({
  selectedProfileImageUrl,
  onClose,
  onSelect,
}: DefaultImageSelectorModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div className="bg-brand-white w-full max-w-lg rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-brand-black text-lg font-bold">
            기본 이미지 선택
          </h2>
          <button
            type="button"
            className="text-brand-gray-400 text-sm"
            onClick={onClose}
          >
            닫기
          </button>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-4">
          {DEFAULT_PROFILE_IMAGE_URL_LIST.map((profileImageUrl) => {
            const isSelected = profileImageUrl === selectedProfileImageUrl
            return (
              <button
                key={profileImageUrl}
                type="button"
                className={cn(
                  'relative aspect-square overflow-hidden rounded-full border-4',
                  isSelected ? 'border-brand-green' : 'border-transparent'
                )}
                onClick={() => onSelect(profileImageUrl)}
              >
                <Image
                  src={normalizeImageSrcForNextImage(profileImageUrl)}
                  alt="기본 프로필 이미지"
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            )
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            취소
          </Button>
        </div>
      </div>
    </div>
  )
}
