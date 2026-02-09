'use client'

import { Input } from '@/shared/ui/input'

interface BasicInfoSectionProps {
  name: string
  joinedAtValue: string
}

export function BasicInfoSection({
  name,
  joinedAtValue,
}: BasicInfoSectionProps) {
  return (
    <div className="w-full max-w-lg">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <p className="text-brand-gray-400 mb-2 text-sm">이름</p>
          <Input value={name} disabled />
        </div>

        <div>
          <p className="text-brand-gray-400 mb-2 text-sm">최초 가입일</p>
          <Input value={joinedAtValue} disabled />
        </div>
      </div>
    </div>
  )
}
