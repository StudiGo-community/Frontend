'use client'

import type {
  GenderUI,
  JoinFormState,
} from '@/features/auth-join/ui/JoinFunnel'
import { Input } from '@/shared/ui/input'
import { Dropdown } from '@/shared/ui/dropdown/Dropdown'

interface ExtraInfoStepProps {
  value: JoinFormState
  onChange: (patch: Partial<JoinFormState>) => void
}

export function ExtraInfoStep({ value, onChange }: ExtraInfoStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-sm">닉네임</label>
        <Input
          value={value.nickname}
          onChange={(e) => onChange({ nickname: e.target.value })}
        />
      </div>

      <div>
        <label className="text-sm">생년월일</label>
        <Input
          type="date"
          value={value.birth}
          onChange={(e) => onChange({ birth: e.target.value })}
        />
      </div>

      <div>
        <label className="text-sm">성별</label>

        <Dropdown
          value={value.gender || undefined}
          onValueChange={(v: string) => onChange({ gender: v as GenderUI })}
        />
      </div>
    </div>
  )
}
