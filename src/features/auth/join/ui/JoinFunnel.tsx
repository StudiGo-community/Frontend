'use client'

import * as React from 'react'
import { useFunnel } from '@/features/auth/join/hooks/useFunnel'
import { Button } from '@/shared/ui/Button'

import { StartStep } from './StartStep'
import { EmailPasswordStep } from './EmailPasswordStep'
import { ProfileTermsStep } from './ProfileTermsStep'
import { ExtraInfoStep } from './ExtraInfoStep'
import { DoneStep } from './DoneStep'

export type StepName =
  | 'start'
  | 'emailPw'
  | 'profileTerms'
  | 'extraInfo'
  | 'done'
export type AgreeKey = 'all' | 'terms' | 'marketing'

export interface JoinFormState {
  email: string
  password: string
  passwordConfirm: string

  name: string
  phone: string
  agree: Record<AgreeKey, boolean>

  nickname: string
  birth: string
  gender: string
}

const STEPS: StepName[] = [
  'start',
  'emailPw',
  'profileTerms',
  'extraInfo',
  'done',
]

const INITIAL: JoinFormState = {
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  phone: '',
  agree: { all: false, terms: false, marketing: false },
  nickname: '',
  birth: '',
  gender: '',
}

export function JoinFunnel() {
  const { Funnel, Step, setStep, currentStep } = useFunnel('start')
  const [form, setForm] = React.useState<JoinFormState>(INITIAL)

  const patch = (p: Partial<JoinFormState>) =>
    setForm((prev) => ({ ...prev, ...p }))

  const setAgree = (key: AgreeKey, value: boolean) => {
    setForm((prev) => {
      if (key === 'all') {
        return {
          ...prev,
          agree: { all: value, terms: value, marketing: value },
        }
      }
      const next = { ...prev.agree, [key]: value }
      return { ...prev, agree: { ...next, all: next.terms && next.marketing } }
    })
  }

  const goNext = () => {
    const idx = STEPS.indexOf(currentStep as StepName)
    setStep(STEPS[Math.min(idx + 1, STEPS.length - 1)])
  }

  const goPrev = () => {
    const idx = STEPS.indexOf(currentStep as StepName)
    setStep(STEPS[Math.max(idx - 1, 0)])
  }

  const canNext = React.useMemo(() => {
    if (currentStep === 'emailPw') {
      return Boolean(form.email && form.password && form.passwordConfirm)
    }
    if (currentStep === 'profileTerms') {
      return Boolean(form.name && form.phone && form.agree.terms)
    }
    if (currentStep === 'extraInfo') {
      return Boolean(form.nickname && form.birth && form.gender)
    }
    return false
  }, [currentStep, form])

  return (
    <div className="w-full">
      <Funnel>
        <Step name="start">
          <StartStep
            onKakao={() => {}}
            onGoogle={() => {}}
            onStartEmail={() => setStep('emailPw')}
          />
        </Step>

        <Step name="emailPw">
          <EmailPasswordStep value={form} onChange={patch} />
        </Step>

        <Step name="profileTerms">
          <ProfileTermsStep
            value={form}
            onChange={patch}
            onToggleAgree={setAgree}
          />
        </Step>

        <Step name="extraInfo">
          <ExtraInfoStep value={form} onChange={patch} />
        </Step>

        <Step name="done">
          <DoneStep value={form} />
        </Step>
      </Funnel>

      {currentStep !== 'start' && currentStep !== 'done' && (
        <div className="mt-10 flex gap-3">
          <Button variant="outline" className="h-12 w-30" onClick={goPrev}>
            이전
          </Button>

          <Button
            className={`h-12 flex-1 ${!canNext ? 'pointer-events-none opacity-50' : ''}`}
            onClick={() => {
              if (currentStep === 'extraInfo') setStep('done')
              else goNext()
            }}
          >
            {currentStep === 'extraInfo' ? '회원가입' : '다음'}
          </Button>
        </div>
      )}
    </div>
  )
}
