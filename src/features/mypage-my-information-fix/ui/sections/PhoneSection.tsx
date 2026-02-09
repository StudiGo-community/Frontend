'use client'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'

interface PhoneSectionProps {
  phone: string
}

export function PhoneSection({ phone }: PhoneSectionProps) {
  return (
    <div className="mt-8">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <p className="text-brand-gray-400 mb-2 text-sm">전화번호</p>
          <Input value={phone} disabled />
          <p className="text-brand-gray-300 mt-2 text-xs">
            전화번호는 보안 정책상 수정할 수 없습니다.
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="md"
          className="min-w-32"
          disabled
        >
          인증 완료
        </Button>
      </div>
    </div>
  )
}
