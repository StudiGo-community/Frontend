'use client'

import { useEffect, useMemo, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import { useQueryState, parseAsStringLiteral } from 'nuqs'

import { Button } from '@/shared/ui/Button'
import { Funnel, Step } from '@/features/auth-join/ui/Funnel'
import { StartStep } from '@/features/auth-join/ui/StartStep'
import { EmailPasswordStep } from '@/features/auth-join/ui/EmailPasswordStep'
import { ProfileTermsStep } from '@/features/auth-join/ui/ProfileTermsStep'
import { ExtraInfoStep } from '@/features/auth-join/ui/ExtraInfoStep'
import { DoneStep } from '@/features/auth-join/ui/DoneStep'
import {
  signupEmail,
  type SignupGender,
} from '@/features/auth-join/api/signup-api'

export type StepName =
  | 'start'
  | 'emailPassword'
  | 'profileTerms'
  | 'extraInfo'
  | 'done'

export type AgreeKey = 'all' | 'terms' | 'privacy' | 'marketing'
export type GenderUI = 'MALE' | 'FEMALE'

export interface JoinFormState {
  email: string
  password: string
  passwordConfirm: string

  emailCheckToken: string
  emailRequestId: string
  emailCode: string
  emailVerified: boolean
  emailVerifyToken: string

  name: string
  phone: string

  agree: Record<AgreeKey, boolean>

  nickname: string
  nicknameVerified: boolean
  nicknameCheckToken: string

  birth: string
  gender: GenderUI | ''
}

const STEP_ORDER = [
  'start',
  'emailPassword',
  'profileTerms',
  'extraInfo',
  'done',
] as const

const INITIAL_JOIN_FORM_STATE: JoinFormState = {
  email: '',
  password: '',
  passwordConfirm: '',

  emailCheckToken: '',
  emailRequestId: '',
  emailCode: '',
  emailVerified: false,
  emailVerifyToken: '',

  name: '',
  phone: '',

  agree: { all: false, terms: false, privacy: false, marketing: false },

  nickname: '',
  nicknameVerified: false,
  nicknameCheckToken: '',

  birth: '',
  gender: '',
}

const JOIN_SESSION_KEY = 'studigo_join_funnel_v1'

type StoredJoinState = {
  v: 1
  step: StepName
  form: JoinFormState
  savedAt: number
}

function loadStoredJoinState(): StoredJoinState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(JOIN_SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredJoinState
    if (parsed?.v !== 1) return null
    if (!parsed.form || !parsed.step) return null
    return parsed
  } catch {
    return null
  }
}

function saveStoredJoinState(next: StoredJoinState) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(JOIN_SESSION_KEY, JSON.stringify(next))
}

function clearStoredJoinState() {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(JOIN_SESSION_KEY)
}

type ApiErrorBody = {
  detail?: string
  error_detail?: string
}

function getErrorMessage(error: unknown, fallback: string) {
  if (!isAxiosError<ApiErrorBody>(error)) return fallback
  return (
    error.response?.data?.detail ??
    error.response?.data?.error_detail ??
    fallback
  )
}

function toGender(value: GenderUI | ''): SignupGender | undefined {
  if (value === 'MALE') return 'M'
  if (value === 'FEMALE') return 'F'
  return undefined
}

function stripPhone(phone: string) {
  return phone.replace(/\D/g, '')
}

function canGoNext(step: StepName, form: JoinFormState) {
  if (step === 'emailPassword') {
    return Boolean(
      form.email &&
      form.password &&
      form.passwordConfirm &&
      form.password === form.passwordConfirm &&
      form.emailVerified &&
      form.emailVerifyToken
    )
  }

  if (step === 'profileTerms') {
    return Boolean(
      form.name && form.phone && form.agree.terms && form.agree.privacy
    )
  }

  if (step === 'extraInfo') {
    return Boolean(
      form.nickname && form.birth && form.gender && form.nicknameVerified
    )
  }

  return false
}

function maxAllowedStep(form: JoinFormState): StepName {
  if (!canGoNext('emailPassword', form)) return 'emailPassword'
  if (!canGoNext('profileTerms', form)) return 'profileTerms'
  if (!canGoNext('extraInfo', form)) return 'extraInfo'
  return 'extraInfo'
}

export function JoinFunnel() {
  const stepParser = useMemo(
    () => parseAsStringLiteral(STEP_ORDER).withDefault('start'),
    []
  )

  const [stepParam, setStepParam] = useQueryState('step', stepParser)
  const currentStep = (stepParam ?? 'start') as StepName

  const [form, setForm] = useState<JoinFormState>(INITIAL_JOIN_FORM_STATE)

  const updateJoinForm = (patch: Partial<JoinFormState>) => {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  const updateAgreement = (key: AgreeKey, value: boolean) => {
    setForm((prev) => {
      if (key === 'all') {
        return {
          ...prev,
          agree: { all: value, terms: value, privacy: value, marketing: value },
        }
      }

      const nextAgree = { ...prev.agree, [key]: value }
      return {
        ...prev,
        agree: {
          ...nextAgree,
          all: nextAgree.terms && nextAgree.privacy && nextAgree.marketing,
        },
      }
    })
  }

  const resetFormAndGoStart = () => {
    clearStoredJoinState()
    setForm(INITIAL_JOIN_FORM_STATE)
    setStepParam('start', { history: 'replace' })
  }

  const canProceedNext = useMemo(
    () => canGoNext(currentStep, form),
    [currentStep, form]
  )

  useEffect(() => {
    if (currentStep === 'start') return

    const stored = loadStoredJoinState()
    if (!stored) return

    setForm(stored.form)

    if (stored.step && stored.step !== currentStep) {
      setStepParam(stored.step, { history: 'replace' })
    }
    // 최초 마운트 시에만 세션스토리지 복구
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (currentStep === 'start' || currentStep === 'done') return

    saveStoredJoinState({
      v: 1,
      step: currentStep,
      form,
      savedAt: Date.now(),
    })
  }, [currentStep, form])

  useEffect(() => {
    if (currentStep === 'start' || currentStep === 'done') return

    const allowed = maxAllowedStep(form)
    const curIdx = STEP_ORDER.indexOf(currentStep)
    const allowedIdx = STEP_ORDER.indexOf(allowed)

    if (curIdx > allowedIdx) {
      setStepParam(allowed, { history: 'replace' })
      toast.message('이전 단계 입력이 필요합니다.')
    }
  }, [currentStep, form, setStepParam])

  const next = () => {
    const idx = STEP_ORDER.indexOf(currentStep)
    const nextStep = STEP_ORDER[Math.min(idx + 1, STEP_ORDER.length - 1)]
    setStepParam(nextStep, { history: 'push' })
  }

  const prev = () => {
    const idx = STEP_ORDER.indexOf(currentStep)
    const prevStep = STEP_ORDER[Math.max(idx - 1, 0)]
    setStepParam(prevStep, { history: 'push' })
  }

  const signupMut = useMutation({
    mutationFn: () =>
      signupEmail({
        email: form.email,
        password: form.password,
        password_confirm: form.passwordConfirm,

        nickname: form.nickname,
        name: form.name,
        gender: toGender(form.gender),

        phone: stripPhone(form.phone),
        birthday: form.birth || undefined,

        agree_terms: form.agree.terms,
        agree_privacy: form.agree.privacy,
        agree_marketing: form.agree.marketing,

        email_verify_token: form.emailVerifyToken,
        nickname_check_token: form.nicknameCheckToken,
      }),
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다.')
      clearStoredJoinState()
      setStepParam('done', { history: 'replace' })
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, '회원가입에 실패했습니다.'))
    },
  })

  return (
    <div className="w-full">
      <Funnel step={currentStep}>
        <Step name="start">
          <StartStep
            onKakao={() => {}}
            onGoogle={() => {}}
            onStartEmail={() => {
              clearStoredJoinState()
              setForm(INITIAL_JOIN_FORM_STATE)
              setStepParam('emailPassword', { history: 'push' })
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
            disabled={signupMut.isPending}
            onClick={() => {
              if (currentStep === 'emailPassword') resetFormAndGoStart()
              else prev()
            }}
          >
            이전
          </Button>

          <Button
            className={`h-12 flex-1 ${
              !canProceedNext || signupMut.isPending
                ? 'pointer-events-none opacity-50'
                : ''
            }`}
            onClick={() => {
              if (currentStep === 'extraInfo') signupMut.mutate()
              else next()
            }}
          >
            {currentStep === 'extraInfo'
              ? signupMut.isPending
                ? '가입 중...'
                : '회원가입'
              : '다음'}
          </Button>
        </div>
      )}
    </div>
  )
}
