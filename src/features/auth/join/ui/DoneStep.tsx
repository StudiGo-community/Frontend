'use client'

import { Button } from '@/shared/ui/Button'
import type { JoinFormState } from './JoinFunnel'

export function DoneStep(props: { value: JoinFormState }) {
  const v = props.value

  return (
    <div className="text-center">
      <div className="border-brand-green text-brand-green mx-auto mb-4 flex size-12 items-center justify-center rounded-full border-2">
        ✓
      </div>

      <h2 className="text-brand-black text-xl font-bold">환영합니다!</h2>
      <p className="text-brand-black mt-1 text-lg font-semibold">
        ¡bienvenido!
      </p>

      <p className="text-brand-gray-400 mt-4 text-sm">
        스터디고에 오신것을 환영합니다.
        <br />
        하루 10분 만으로 스페인어 완전 정복하기!
      </p>

      <div className="bg-brand-gray-100 mt-6 rounded-md p-4 text-left text-sm">
        <div className="text-brand-gray-400">
          이메일&nbsp;&nbsp;{v.email || '-'}
        </div>
        <div className="text-brand-gray-400 mt-1">
          닉네임&nbsp;&nbsp;{v.nickname || '-'}
        </div>
        <div className="text-brand-gray-400 mt-1">
          이름&nbsp;&nbsp;{v.name || '-'}
        </div>
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
