'use client'

import { Button } from '@/shared/ui/Button'
import type { JoinFormState } from '@/features/auth-join/ui/JoinFunnel'

export function DoneStep(props: { value: JoinFormState }) {
  const formValue = props.value

  return (
    <div className="text-center">
      <div className="border-brand-green text-brand-green mx-auto mb-5 flex size-12 items-center justify-center rounded-full border-2">
        ✓
      </div>

      <h2 className="text-brand-black text-2xl font-bold">환영합니다!</h2>
      <p className="text-brand-black mt-1 text-xl font-semibold">
        ¡bienvenido!
      </p>

      <p className="text-brand-gray-400 mt-5 text-base leading-relaxed">
        스터디고에 오신 것을 환영합니다.
        <br />
        하루 10분 만으로 스페인어 완전 정복하기!
      </p>

      <div className="bg-brand-gray-100 mt-8 rounded-md p-4 text-sm">
        <InfoRow label="이메일" value={formValue.email} />
        <InfoRow label="닉네임" value={formValue.nickname} />
        <InfoRow label="이름" value={formValue.name} />
      </div>

      <Button
        type="button"
        size="reg"
        className="bg-brand-black text-brand-white mt-8 w-full hover:opacity-90"
        onClick={() => {
          window.location.href = '/auth/login'
        }}
      >
        이메일로 로그인
      </Button>
    </div>
  )
}

function InfoRow(props: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-brand-gray-400">{props.label}</span>

      <span className="text-brand-black font-medium">{props.value || '-'}</span>
    </div>
  )
}
