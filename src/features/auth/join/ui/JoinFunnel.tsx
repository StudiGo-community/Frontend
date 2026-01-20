'use client'

import * as React from 'react'
import { useFunnel } from '@/features/auth/join/hooks/useFunnel'
import { Button } from '@/shared/ui/Button'

import { StartStep } from '@/features/auth/join/ui/StartStep'
import { EmailPasswordStep } from '@/features/auth/join/ui/EmailPasswordStep'
import { ProfileTermsStep } from '@/features/auth/join/ui/ProfileTermsStep'
import { ExtraInfoStep } from '@/features/auth/join/ui/ExtraInfoStep'
import { DoneStep } from '@/features/auth/join/ui/DoneStep'

export type StepName =
  | 'start'
  | 'emailPassword'
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

const STEP_ORDER: StepName[] = [
  'start',
  'emailPassword',
  'profileTerms',
  'extraInfo',
  'done',
]

const INITIAL_JOIN_FORM_STATE: JoinFormState = {
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
  const [form, setForm] = React.useState<JoinFormState>(INITIAL_JOIN_FORM_STATE)

  const updateJoinForm = (next: Partial<JoinFormState>) =>
    setForm((prev) => ({ ...prev, ...next }))

  const updateAgreement = (key: AgreeKey, value: boolean) => {
    setForm((prev) => {
      if (key === 'all') {
        return {
          ...prev,
          agree: { all: value, terms: value, marketing: value },
        }
      }

      const nextAgree = { ...prev.agree, [key]: value }
      return {
        ...prev,
        agree: {
          ...nextAgree,
          all: nextAgree.terms && nextAgree.marketing,
        },
      }
    })
  }

  const resetFormAndGoStart = () => {
    setForm(INITIAL_JOIN_FORM_STATE)
    setStep('start')
  }

  const goNextStep = () => {
    const index = STEP_ORDER.indexOf(currentStep as StepName)
    setStep(STEP_ORDER[Math.min(index + 1, STEP_ORDER.length - 1)])
  }

  const goPrevStep = () => {
    const index = STEP_ORDER.indexOf(currentStep as StepName)
    setStep(STEP_ORDER[Math.max(index - 1, 0)])
  }

  const canProceedNext = React.useMemo(() => {
    if (currentStep === 'emailPassword') {
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
            onStartEmail={() => {
              setForm(INITIAL_JOIN_FORM_STATE)
              setStep('emailPassword')
            }}
          />
        </Step>

        <Step name="emailPassword">
          <EmailPasswordStep value={form} onChange={updateJoinForm} />
        </Step>

        <Step name="profileTerms">
          <ProfileTermsStep
            value={form}
            onChange={updateJoinForm}
            onToggleAgree={updateAgreement}
          />
        </Step>

        <Step name="extraInfo">
          <ExtraInfoStep value={form} onChange={updateJoinForm} />
        </Step>

        <Step name="done">
          <DoneStep value={form} />
        </Step>
      </Funnel>

      {currentStep !== 'start' && currentStep !== 'done' && (
        <div className="mt-10 flex gap-3">
          <Button
            variant="outline"
            className="h-12 w-30"
            onClick={() => {
              if (currentStep === 'emailPassword') resetFormAndGoStart()
              else goPrevStep()
            }}
          >
            이전
          </Button>

          <Button
            className={`h-12 flex-1 ${!canProceedNext ? 'pointer-events-none opacity-50' : ''}`}
            onClick={() => {
              if (currentStep === 'extraInfo') setStep('done')
              else goNextStep()
            }}
          >
            {currentStep === 'extraInfo' ? '회원가입' : '다음'}
          </Button>
        </div>
      )}
    </div>
  )
}
