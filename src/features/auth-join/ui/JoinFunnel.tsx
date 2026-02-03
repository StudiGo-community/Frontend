'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
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
  step: Exclude<StepName, 'start' | 'done'>
  form: JoinFormState
  savedAt: number
}

type ApiErrorBody = { detail?: string; error_detail?: string }

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

function maxAllowedStep(
  form: JoinFormState
): Exclude<StepName, 'start' | 'done'> {
  if (!canGoNext('emailPassword', form)) return 'emailPassword'
  if (!canGoNext('profileTerms', form)) return 'profileTerms'
  if (!canGoNext('extraInfo', form)) return 'extraInfo'
  return 'extraInfo'
}

function loadStored(): StoredJoinState | null {
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

function saveStored(step: StoredJoinState['step'], form: JoinFormState) {
  const payload: StoredJoinState = { v: 1, step, form, savedAt: Date.now() }
  sessionStorage.setItem(JOIN_SESSION_KEY, JSON.stringify(payload))
}

function clearStored() {
  sessionStorage.removeItem(JOIN_SESSION_KEY)
}

function getNavigationType():
  | 'reload'
  | 'navigate'
  | 'back_forward'
  | 'prerender'
  | 'unknown' {
  const entry = performance.getEntriesByType('navigation')[0] as
    | PerformanceNavigationTiming
    | undefined
  return entry?.type ?? 'unknown'
}

export function JoinFunnel() {
  const stepParser = useMemo(
    () => parseAsStringLiteral(STEP_ORDER).withDefault('start'),
    []
  )
  const [stepParam, setStepParam] = useQueryState('step', stepParser)
  const currentStep = (stepParam ?? 'start') as StepName

  const [form, setForm] = useState<JoinFormState>(INITIAL_JOIN_FORM_STATE)
  const [isHydrated, setIsHydrated] = useState(false)
  const didInit = useRef(false)

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

  useEffect(() => {
    if (didInit.current) return
    didInit.current = true

    const navType = getNavigationType()
    const stored = loadStored()

    if (currentStep === 'start') {
      clearStored()
      setForm(INITIAL_JOIN_FORM_STATE)
      setIsHydrated(true)
      return
    }

    if (navType === 'reload' && stored) {
      setForm(stored.form)

      const allowed = maxAllowedStep(stored.form)
      const desired =
        STEP_ORDER.indexOf(stored.step) > STEP_ORDER.indexOf(allowed)
          ? allowed
          : stored.step

      setStepParam(desired, { history: 'replace' })
      setIsHydrated(true)
      return
    }

    clearStored()
    setForm(INITIAL_JOIN_FORM_STATE)
    setStepParam('start', { history: 'replace' })
    setIsHydrated(true)
    // 최초 마운트 시에만 세션스토리지 복구
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    if (currentStep === 'start' || currentStep === 'done') return

    const allowed = maxAllowedStep(form)
    const normalizedStep =
      STEP_ORDER.indexOf(currentStep) > STEP_ORDER.indexOf(allowed)
        ? allowed
        : (currentStep as StoredJoinState['step'])

    saveStored(normalizedStep, form)
  }, [currentStep, form, isHydrated])

  useEffect(() => {
    if (!isHydrated) return
    if (currentStep === 'start' || currentStep === 'done') return

    const allowed = maxAllowedStep(form)
    const curIdx = STEP_ORDER.indexOf(currentStep)
    const allowedIdx = STEP_ORDER.indexOf(allowed)
    if (curIdx > allowedIdx) {
      setStepParam(allowed, { history: 'replace' })
      toast.message('이전 단계 입력이 필요합니다.')
    }
  }, [currentStep, form, setStepParam, isHydrated])

  useEffect(() => {
    return () => {
      clearStored()
    }
  }, [])

  const goStartAndClear = () => {
    clearStored()
    setForm(INITIAL_JOIN_FORM_STATE)
    setStepParam('start', { history: 'replace' })
  }

  const next = () => {
    const idx = STEP_ORDER.indexOf(currentStep)
    const nextStep = STEP_ORDER[Math.min(idx + 1, STEP_ORDER.length - 1)]
    setStepParam(nextStep, { history: 'push' })
  }

  const prev = () => {
    if (currentStep === 'emailPassword') {
      goStartAndClear()
      return
    }

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
      clearStored()
      setStepParam('done', { history: 'replace' })
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, '회원가입에 실패했습니다.'))
    },
  })

  const canProceedNext = useMemo(
    () => canGoNext(currentStep, form),
    [currentStep, form]
  )

  return (
    <div className="w-full">
      <Funnel step={currentStep}>
        <Step name="start">
          <StartStep
            onKakao={() => {}}
            onGoogle={() => {}}
            onStartEmail={() =>
              setStepParam('emailPassword', { history: 'push' })
            }
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
            onClick={prev}
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
