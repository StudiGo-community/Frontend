'use client'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'

interface EmailSectionProps {
  email: string
}

export function EmailSection({ email }: EmailSectionProps) {
  return (
    <div className="mt-8">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <p className="text-brand-gray-400 mb-2 text-sm">이메일</p>
          <Input value={email} disabled />
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
