'use client'

import Image from 'next/image'
import { type ChangeEventHandler, type RefObject } from 'react'

import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'
import { normalizeImageSrcForNextImage } from '@/entities/mypage-my-information-fix/lib/normalize-image-src'

interface ProfileSectionProps {
  selectedProfileImageUrl: string
  profileBorderClass: string
  fileInputRef: RefObject<HTMLInputElement | null>
  onChangeFile: ChangeEventHandler<HTMLInputElement>
  onClickUpload: () => void
  onOpenDefaultImageSelector: () => void
}

export function ProfileSection({
  selectedProfileImageUrl,
  profileBorderClass,
  fileInputRef,
  onChangeFile,
  onClickUpload,
  onOpenDefaultImageSelector,
}: ProfileSectionProps) {
  return (
    <div className="flex items-start gap-10">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'bg-brand-gray-100 relative h-36 w-36 overflow-hidden rounded-full border-4',
            profileBorderClass
          )}
        >
          <Image
            src={normalizeImageSrcForNextImage(selectedProfileImageUrl)}
            alt="프로필 이미지"
            fill
            sizes="144px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="text-brand-gray-300 pt-3 text-sm leading-7">
        <p>• 최대 5MB까지 업로드 가능합니다.</p>
        <p>• 확장자는 JPG, PNG 사용 가능합니다.</p>

        <div className="mt-4 flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={onChangeFile}
          />

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onClickUpload}
          >
            업로드
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onOpenDefaultImageSelector}
          >
            기본 이미지
          </Button>
        </div>
      </div>
    </div>
  )
}
