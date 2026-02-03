'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { isAxiosError } from 'axios'
import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { toast } from 'sonner'

import { Button } from '@/shared/ui/Button'
import { Funnel, Step } from '@/features/auth-join/ui/Funnel'
import { DoneStep } from '@/features/auth-join/ui/DoneStep'
import { EmailPasswordStep } from '@/features/auth-join/ui/EmailPasswordStep'
import { ExtraInfoStep } from '@/features/auth-join/ui/ExtraInfoStep'
import { ProfileTermsStep } from '@/features/auth-join/ui/ProfileTermsStep'
import { StartStep } from '@/features/auth-join/ui/StartStep'
import { useSignupEmailMutation } from '@/features/auth-join/api/use-signup-email-mutation'
import type {
  SignupEmailRequest,
  SignupGender,
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

interface StoredJoinState {
  v: 1
  step: Exclude<StepName, 'start' | 'done'>
  form: JoinFormState
  savedAt: number
}

interface ApiErrorBody {
  detail?: string
  error_detail?: string
}

const STEP_ORDER = [
  'start',
  'emailPassword',
  'profileTerms',
  'extraInfo',
  'done',
] as const

const JOIN_SESSION_KEY = 'studigo_join_funnel_v1'

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

const getErrorMessage = (error: unknown, fallback: string) => {
  if (!isAxiosError<ApiErrorBody>(error)) return fallback
  return (
    error.response?.data?.detail ??
    error.response?.data?.error_detail ??
    fallback
  )
}

const stripPhone = (phone: string) => phone.replace(/\D/g, '')

const toGender = (value: GenderUI | ''): SignupGender | undefined => {
  if (value === 'MALE') return 'M'
  if (value === 'FEMALE') return 'F'
  return undefined
}

const canGoNext = (step: StepName, form: JoinFormState) => {
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
      form.nickname &&
      form.birth &&
      form.gender &&
      form.nicknameVerified &&
      form.nicknameCheckToken
    )
  }

  return false
}

const maxAllowedStep = (
  form: JoinFormState
): Exclude<StepName, 'start' | 'done'> => {
  if (!canGoNext('emailPassword', form)) return 'emailPassword'
  if (!canGoNext('profileTerms', form)) return 'profileTerms'
  if (!canGoNext('extraInfo', form)) return 'extraInfo'
  return 'extraInfo'
}

const loadStoredJoinState = (): StoredJoinState | null => {
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

const saveStoredJoinState = (
  step: StoredJoinState['step'],
  form: JoinFormState
) => {
  const payload: StoredJoinState = { v: 1, step, form, savedAt: Date.now() }
  sessionStorage.setItem(JOIN_SESSION_KEY, JSON.stringify(payload))
}

const clearStoredJoinState = () => {
  sessionStorage.removeItem(JOIN_SESSION_KEY)
}

export const JoinFunnel = () => {
  const stepParser = useMemo(
    () => parseAsStringLiteral(STEP_ORDER).withDefault('start'),
    []
  )

  const [stepParam, setStepParam] = useQueryState('step', stepParser)
  const currentStep = (stepParam ?? 'start') as StepName

  const [form, setForm] = useState<JoinFormState>(INITIAL_JOIN_FORM_STATE)
  const [isHydrated, setIsHydrated] = useState(false)

  const isSubmittingRef = useRef(false)

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

  const goStartAndClear = () => {
    clearStoredJoinState()
    setForm(INITIAL_JOIN_FORM_STATE)
    setStepParam('start', { history: 'replace' })
  }

  useEffect(() => {
    const stored = loadStoredJoinState()

    if (currentStep === 'start') {
      clearStoredJoinState()
      setForm(INITIAL_JOIN_FORM_STATE)
      setIsHydrated(true)
      return
    }

    if (stored) {
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

    setForm(INITIAL_JOIN_FORM_STATE)
    setStepParam('start', { history: 'replace' })
    setIsHydrated(true)

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

    saveStoredJoinState(normalizedStep, form)
  }, [isHydrated, currentStep, form])

  useEffect(() => {
    if (!isHydrated) return
    if (currentStep === 'start' || currentStep === 'done') return

    const allowed = maxAllowedStep(form)
    const currentIndex = STEP_ORDER.indexOf(currentStep)
    const allowedIndex = STEP_ORDER.indexOf(allowed)

    if (currentIndex > allowedIndex) {
      setStepParam(allowed, { history: 'replace' })
      toast.message('이전 단계 입력이 필요합니다.')
    }
  }, [isHydrated, currentStep, form, setStepParam])

  const next = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep)
    const nextStep =
      STEP_ORDER[Math.min(currentIndex + 1, STEP_ORDER.length - 1)]
    setStepParam(nextStep, { history: 'push' })
  }

  const prev = () => {
    if (currentStep === 'emailPassword') {
      goStartAndClear()
      return
    }
    const currentIndex = STEP_ORDER.indexOf(currentStep)
    const prevStep = STEP_ORDER[Math.max(currentIndex - 1, 0)]
    setStepParam(prevStep, { history: 'push' })
  }

  const canProceedNext = useMemo(
    () => canGoNext(currentStep, form),
    [currentStep, form]
  )

  const signupEmailMutation = useSignupEmailMutation()

  const onClickSubmit = async () => {
    if (signupEmailMutation.isPending) return
    if (isSubmittingRef.current) return

    isSubmittingRef.current = true

    const payload: SignupEmailRequest = {
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
    }

    try {
      await signupEmailMutation.mutateAsync(payload)
      toast.success('회원가입이 완료되었습니다.')
      clearStoredJoinState()
      setStepParam('done', { history: 'replace' })
    } catch (error: unknown) {
      console.error('[signup error]', error)
      toast.error(getErrorMessage(error, '회원가입에 실패했습니다.'))
    } finally {
      isSubmittingRef.current = false
    }
  }

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
            disabled={signupEmailMutation.isPending}
            onClick={prev}
          >
            이전
          </Button>

          <Button
            className="h-12 flex-1"
            disabled={!canProceedNext || signupEmailMutation.isPending}
            onClick={() => {
              if (currentStep === 'extraInfo') void onClickSubmit()
              else next()
            }}
          >
            {currentStep === 'extraInfo'
              ? signupEmailMutation.isPending
                ? '가입 중...'
                : '회원가입'
              : '다음'}
          </Button>
        </div>
      )}
    </div>
  )
}
