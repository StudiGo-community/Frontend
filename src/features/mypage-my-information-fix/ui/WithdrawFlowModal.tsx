'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Modal } from '@/shared/ui/Modal'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'
import { cn } from '@/shared/lib/cn'
import { Dropdown } from '@/shared/ui/dropdown/Dropdown'

import { WithdrawConfirmModal } from '@/features/mypage-my-information-fix/ui/WithdrawConfirmModal'
import {
  REASON_LABEL,
  type WithdrawalReason,
} from '@/features/mypage-my-information-fix/ui/withdraw-types'

import { normalizeWithdrawalTokenError } from '@/features/mypage-my-information-fix/lib/normalize-withdrawal-token-error'
import { normalizeWithdrawalError } from '@/features/mypage-my-information-fix/lib/normalize-withdrawal-error'
import { useWithdrawalTokenStep } from '../hook/useWithdrawalTokenStep'
import { useWithdrawal } from '../hook/useWithdrawal'
import { useWithdrawalTokenByPassword } from '../hook/useWithdrawalTokenByPassword'

type Step = 'GUIDE' | 'REASON' | 'PASSWORD'

interface WithdrawFlowModalProps {
  isOpen: boolean
  onClose: () => void
}

function buildWithdrawalSocialReauthUrl(provider: 'google' | 'kakao'): string {
  const baseUrlFromEnv = process.env.NEXT_PUBLIC_API_BASE_URL
  const base = typeof baseUrlFromEnv === 'string' ? baseUrlFromEnv : ''

  // base가 '.../api/v1' 를 포함하는 경우가 많아서 안전하게 정리
  const trimmedBase = base.endsWith('/') ? base.slice(0, -1) : base
  const baseWithoutApiV1 = trimmedBase.endsWith('/api/v1')
    ? trimmedBase.slice(0, -'/api/v1'.length)
    : trimmedBase

  if (baseWithoutApiV1.length === 0) {
    return `/api/v1/oauth/${provider}/callback?purpose=withdrawal`
  }

  return `${baseWithoutApiV1}/api/v1/oauth/${provider}/callback?purpose=withdrawal`
}

export function WithdrawFlowModal({ isOpen, onClose }: WithdrawFlowModalProps) {
  const router = useRouter()
  const [step, setStep] = useState<Step>('GUIDE')

  // 탈퇴안내 1
  const [agree1, setAgree1] = useState(false)
  const [agree2, setAgree2] = useState(false)

  // 탈퇴사유 2
  const [reason, setReason] = useState<WithdrawalReason>('')
  const [etcText, setEtcText] = useState('')

  // 비밀번호 3 (명세상: 비밀번호로 "탈퇴 인증 토큰" 발급)
  const [password, setPassword] = useState('')

  // 경고창 4
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const { data: tokenStepData, isError: isTokenStepError } =
    useWithdrawalTokenStep(isOpen)

  const tokenByPasswordMutation = useWithdrawalTokenByPassword()
  const withdrawalMutation = useWithdrawal()

  const isPending =
    tokenByPasswordMutation.isPending || withdrawalMutation.isPending

  const reset = () => {
    setStep('GUIDE')
    setAgree1(false)
    setAgree2(false)
    setReason('')
    setEtcText('')
    setPassword('')
    setIsConfirmOpen(false)
    tokenByPasswordMutation.reset()
    withdrawalMutation.reset()
  }

  const handleClose = () => {
    if (isPending) return
    reset()
    onClose()
  }

  useEffect(() => {
    if (!isOpen) return
    if (isTokenStepError) return
    if (!tokenStepData) return

    if (tokenStepData.next_step === 'social') {
      const provider = tokenStepData.providers[0]
      if (!provider) {
        toast.error('소셜 재인증 제공자를 찾을 수 없습니다.')
        return
      }

      toast.message('회원탈퇴를 위해 소셜 재인증이 필요합니다.')
      const url = buildWithdrawalSocialReauthUrl(provider)
      window.location.href = url
    }
  }, [isOpen, isTokenStepError, tokenStepData])

  const canNextGuide = agree1 && agree2
  const etcTooLong = etcText.length > 500
  const canNextReason = !etcTooLong
  const canNextPassword = password.trim().length > 0

  const goPrev = () => {
    if (isPending) return
    if (step === 'REASON') setStep('GUIDE')
    else if (step === 'PASSWORD') setStep('REASON')
  }

  const goNext = () => {
    if (isPending) return

    if (tokenStepData?.next_step === 'social') {
      // 소셜은 useEffect에서 바로 이동 처리한다.
      return
    }

    if (step === 'GUIDE') {
      if (!canNextGuide) return
      setStep('REASON')
      return
    }

    if (step === 'REASON') {
      if (!canNextReason) return
      setStep('PASSWORD')
      return
    }

    if (step === 'PASSWORD') {
      if (!canNextPassword) return
      setIsConfirmOpen(true)
    }
  }

  const handleConfirmWithdraw = () => {
    if (isPending) return

    if (!tokenStepData) {
      toast.error('회원탈퇴 인증 정보를 불러오지 못했습니다.')
      return
    }

    if (tokenStepData.next_step !== 'password') {
      toast.error('비밀번호 인증이 필요한 계정이 아닙니다.')
      return
    }

    const trimmedPassword = password.trim()
    if (trimmedPassword.length === 0) {
      toast.error('비밀번호를 입력해 주세요.')
      return
    }

    tokenByPasswordMutation.mutate(
      { password: trimmedPassword },
      {
        onSuccess: (tokenRes) => {
          withdrawalMutation.mutate(
            { withdrawal_token: tokenRes.withdrawal_token },
            {
              onSuccess: (withdrawRes) => {
                setIsConfirmOpen(false)
                toast.success(withdrawRes.detail)
                reset()
                onClose()
                router.replace('/')
              },
              onError: (error) => {
                toast.error(normalizeWithdrawalError(error))
              },
            }
          )
        },
        onError: (error) => {
          toast.error(normalizeWithdrawalTokenError(error))
        },
      }
    )
  }

  if (!isOpen) return null

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} title="회원탈퇴" size="lg">
        {step === 'GUIDE' && (
          <div>
            <p className="text-brand-main text-sm leading-6 font-bold">
              회원탈퇴 시 개인정보 및 Studigo에서 만들어진 모든 데이터는
              삭제됩니다.
              <br />
              (단, 아래 항목은 표기된 방법에 따라 특정 기간 동안 보관됩니다.)
            </p>

            <div className="mt-5">
              <p className="text-brand-black font-bold">유지되는 정보</p>
              <ol className="text-brand-gray-400 mt-2 list-decimal pl-5 text-sm leading-6">
                <li>작성한 게시글과 댓글은 탈퇴한 회원으로 남아있게 됩니다.</li>
                <li>그 외 모든 정보는 탈퇴와 함께 모두 삭제될 예정입니다.</li>
              </ol>
            </div>

            <div className="mt-5">
              <p className="text-brand-black font-bold">유의 사항 안내</p>
              <ol className="text-brand-gray-400 mt-2 list-decimal pl-5 text-sm leading-6">
                <li>
                  탈퇴 후 개인정보를 복원할 수 없으며, 동일 이메일/휴대폰 번호로
                  재가입 시 신규가입으로 처리됩니다.
                </li>
                <li>소셜 로그인으로 연동하신 경우 연동이 자동해제 됩니다.</li>
              </ol>
            </div>

            <div className="mt-6 space-y-3">
              <label className="flex cursor-pointer items-start gap-3 select-none">
                <input
                  type="checkbox"
                  checked={agree1}
                  onChange={(e) => setAgree1(e.target.checked)}
                  className={cn(
                    'mt-1 h-4 w-4 rounded border',
                    'accent-brand-main'
                  )}
                />
                <span className="text-brand-gray-400 text-sm leading-6">
                  해당 내용을 모두 확인했으며, 회원탈퇴에 동의합니다.
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-3 select-none">
                <input
                  type="checkbox"
                  checked={agree2}
                  onChange={(e) => setAgree2(e.target.checked)}
                  className={cn(
                    'mt-1 h-4 w-4 rounded border',
                    'accent-brand-main'
                  )}
                />
                <span className="text-brand-gray-400 text-sm leading-6">
                  탈퇴 후 계정을 복구할 수 없음을 확인했습니다.
                </span>
              </label>
            </div>

            <div className="mt-6">
              <Button
                type="button"
                variant="primary"
                size="reg"
                className="w-full"
                onClick={goNext}
                disabled={!canNextGuide || isPending}
              >
                다음
              </Button>
            </div>
          </div>
        )}

        {step === 'REASON' && (
          <div>
            <p className="text-brand-black font-bold">탈퇴사유</p>

            <div className="mt-4">
              <Dropdown
                value={reason}
                onValueChange={(v) => setReason(v as WithdrawalReason)}
              >
                <Dropdown.Trigger size="md" className="w-full">
                  <Dropdown.Value placeholder="회원 탈퇴하는 이유를 선택해주세요" />
                </Dropdown.Trigger>

                <Dropdown.Content sideOffset={6}>
                  {(
                    Object.keys(REASON_LABEL) as Array<
                      Exclude<WithdrawalReason, ''>
                    >
                  ).map((key) => (
                    <Dropdown.Item key={key} value={key}>
                      {REASON_LABEL[key]}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Content>
              </Dropdown>
            </div>

            {reason === 'ETC' && (
              <div className="mt-4">
                <textarea
                  value={etcText}
                  onChange={(e) => setEtcText(e.target.value)}
                  className={cn(
                    'w-full rounded-xl border p-3 text-sm outline-none',
                    etcTooLong ? 'border-brand-main' : 'border-brand-gray-200'
                  )}
                  rows={4}
                  placeholder="기타 사유를 입력해주세요."
                />
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <Button
                type="button"
                variant="outline"
                size="md"
                className="flex-1"
                onClick={goPrev}
                disabled={isPending}
              >
                이전
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                className={cn('flex-1', 'bg-brand-main hover:bg-brand-main/90')}
                onClick={goNext}
                disabled={!canNextReason || isPending}
              >
                다음
              </Button>
            </div>
          </div>
        )}

        {step === 'PASSWORD' && (
          <div>
            <p className="text-brand-gray-400 mb-2 text-sm">비밀번호</p>

            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
              disabled={isPending}
            />

            <div className="mt-6 flex gap-3">
              <Button
                type="button"
                variant="outline"
                size="md"
                className="flex-1"
                onClick={goPrev}
                disabled={isPending}
              >
                이전
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                className={cn('flex-1', 'bg-brand-main hover:bg-brand-main/90')}
                onClick={goNext}
                disabled={!canNextPassword || isPending}
              >
                다음
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <WithdrawConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => {
          if (isPending) return
          setIsConfirmOpen(false)
        }}
        onConfirm={handleConfirmWithdraw}
        isPending={isPending}
      />
    </>
  )
}
