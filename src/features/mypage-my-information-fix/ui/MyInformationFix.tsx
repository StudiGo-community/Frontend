'use client'

import { useRef, useState, type ChangeEventHandler } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'

import { WithdrawFlowModal } from './WithdrawFlowModal'

type UserRole = 'user' | 'admin' | 'instructor'

interface MyInfoDraft {
  nickname: string
  marketingAgree: boolean
  profileImage?: string | null
}

const MYINFO_STORAGE_KEY = 'studigo_myinfo_draft'

const getInitialDraft = (): MyInfoDraft | null => {
  if (typeof window === 'undefined') return null

  try {
    const raw = localStorage.getItem(MYINFO_STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as Partial<MyInfoDraft>

    const nickname =
      typeof parsed.nickname === 'string' ? parsed.nickname : 'fortes42'
    const marketingAgree =
      typeof parsed.marketingAgree === 'boolean' ? parsed.marketingAgree : true
    const profileImage =
      typeof parsed.profileImage === 'string' || parsed.profileImage === null
        ? parsed.profileImage
        : null

    return { nickname, marketingAgree, profileImage }
  } catch {
    return null
  }
}

export function MyInformationFix() {
  const router = useRouter()

  const fileRef = useRef<HTMLInputElement>(null)

  const [draft] = useState<MyInfoDraft | null>(() => getInitialDraft())

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    draft?.profileImage ?? null
  )

  const userRole: UserRole = 'user' // TODO: 실제 유저 role로 교체
  const [nickname, setNickname] = useState(draft?.nickname ?? 'fortes42')
  const [marketingAgree, setMarketingAgree] = useState(
    draft?.marketingAgree ?? true
  )

  const nameValue = '박진우'
  const joinedAtValue = '2026.01.08'
  const emailValue = 'forteslv42@gmail.com'
  const phoneValue = '01012345678'

  const [isPasswordEditing, setIsPasswordEditing] = useState(false)

  const [currentPassword] = useState('***************')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')

  const hasTypedNewPw = isPasswordEditing && newPassword.length > 0
  const isMin8 = newPassword.length >= 8
  const hasLetter = /[A-Za-z]/.test(newPassword)
  const hasNumber = /\d/.test(newPassword)
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword)
  const isComboOk = hasLetter && hasNumber && hasSpecial

  const passwordRuleTextColor = (ok: boolean) => {
    if (!hasTypedNewPw) return 'text-brand-gray-300'
    return ok ? 'text-brand-green' : 'text-brand-main'
  }

  const isPasswordMismatch =
    isPasswordEditing &&
    newPasswordConfirm.length > 0 &&
    newPassword !== newPasswordConfirm

  const profileBorderClass = {
    user: 'border-brand-green',
    admin: 'border-brand-purple',
    instructor: 'border-brand-blue',
  }[userRole]

  const handleClickUpload = () => {
    fileRef.current?.click()
  }

  const handleChangeFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert('최대 5MB까지 업로드 가능합니다.')
      if (fileRef.current) fileRef.current.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : null
      setPreviewUrl(result)
    }
    reader.readAsDataURL(file)
  }

  const handleClickResetImage = () => {
    setPreviewUrl(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const togglePasswordEdit = () => {
    setIsPasswordEditing((prev) => {
      const next = !prev
      if (!next) {
        setNewPassword('')
        setNewPasswordConfirm('')
      }
      return next
    })
  }

  const handleSave = () => {
    const payload: MyInfoDraft = {
      nickname,
      marketingAgree,
      profileImage: previewUrl ?? null,
    }

    try {
      localStorage.setItem(MYINFO_STORAGE_KEY, JSON.stringify(payload))
    } catch {}

    router.push('/mypage')
    router.refresh()
  }

  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)

  return (
    <main className="bg-brand-white w-full">
      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        <h1 className="text-brand-black text-3xl font-bold">내 정보 수정</h1>
        <div className="bg-brand-gray-200 mt-6 h-px w-full" />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex items-start gap-10">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'bg-brand-gray-100 relative h-36 w-36 overflow-hidden rounded-full border-4',
                  profileBorderClass
                )}
              >
                <Image
                  src={previewUrl ?? '/images/profiles/default-1.webp'}
                  alt="프로필 이미지"
                  fill
                  sizes="144px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="text-brand-gray-300 pt-3 text-sm leading-7">
              <p>• 최대 5 MB까지 업로드 가능합니다.</p>
              <p>• 확장자는 JPG, PNG 사용 가능합니다.</p>

              <div className="mt-4 flex items-center gap-3">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={handleChangeFile}
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleClickUpload}
                >
                  업로드
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleClickResetImage}
                >
                  기본 이미지
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full max-w-lg">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <p className="text-brand-gray-400 mb-2 text-sm">이름</p>
                <Input value={nameValue} disabled />
              </div>

              <div>
                <p className="text-brand-gray-400 mb-2 text-sm">최초 가입일</p>
                <Input value={joinedAtValue} disabled />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <p className="text-brand-gray-400 mb-2 text-sm">닉네임</p>
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력해 주세요"
              />
            </div>

            <Button
              type="button"
              variant="secondary"
              size="md"
              className="min-w-32"
              onClick={() => alert('중복 확인 (UI 더미)')}
            >
              중복 확인
            </Button>
          </div>

          {(() => {
            const hasTyped = nickname.length > 0
            const isLengthOk = nickname.length >= 2 && nickname.length <= 12
            const isCharOk = /^[A-Za-z0-9가-힣]+$/.test(nickname)
            const isBannedOk = true // TODO: 금지어 체크 API 연결 전까지는 true

            const nicknameRuleTextColor = (ok: boolean) => {
              if (!hasTyped) return 'text-brand-gray-300'
              return ok ? 'text-brand-green' : 'text-brand-main'
            }

            return (
              <div className="mt-3 text-xs leading-5">
                <p className={nicknameRuleTextColor(isLengthOk)}>
                  ✓ 최소 2글자 최대 12글자
                </p>
                <p className={nicknameRuleTextColor(isCharOk)}>
                  ✓ 한글, 영문, 숫자만 사용 가능 (특수문자, 공백 불가)
                </p>
                <p className={nicknameRuleTextColor(isBannedOk)}>
                  ✓ 금지어 포함 불가
                </p>
              </div>
            )
          })()}
        </div>

        <div className="mt-8">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <p className="text-brand-gray-400 mb-2 text-sm">이메일</p>
              <Input value={emailValue} disabled />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="md"
              className="min-w-32"
              disabled
            >
              인증 완료
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <p className="text-brand-gray-400 mb-2 text-sm">전화번호</p>
              <Input value={phoneValue} disabled />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="md"
              className="min-w-32"
              disabled
            >
              인증 완료
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <p className="text-brand-gray-400 mb-2 text-sm">기존 비밀번호</p>
              <Input type="password" value={currentPassword} readOnly />
            </div>

            <Button
              type="button"
              variant="secondary"
              size="md"
              className="min-w-32"
              onClick={togglePasswordEdit}
            >
              {isPasswordEditing ? '변경 취소' : '비밀번호 변경'}
            </Button>
          </div>

          {isPasswordEditing && (
            <div className="mt-6 grid grid-cols-1 gap-6">
              <div>
                <p className="text-brand-gray-400 mb-2 text-sm">
                  새로운 비밀번호
                </p>

                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="새로운 비밀번호를 입력해주세요."
                />

                <div className="mt-3 text-sm leading-6">
                  <p className={cn(passwordRuleTextColor(isMin8))}>
                    ✓ 최소 8글자
                  </p>
                  <p className={cn(passwordRuleTextColor(isComboOk))}>
                    ✓ 영문, 숫자, 특수문자 조합
                  </p>
                </div>
              </div>

              <div>
                <p className="text-brand-gray-400 mb-2 text-sm">
                  새로운 비밀번호 확인
                </p>

                <Input
                  type="password"
                  value={newPasswordConfirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                  placeholder="비밀번호를 한 번 더 입력해주세요."
                />

                {isPasswordMismatch && (
                  <p className="text-brand-main mt-2 text-sm">
                    비밀번호가 일치하지 않습니다.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12">
          <h2 className="text-brand-black text-base font-bold">선택 정보</h2>
          <div className="bg-brand-gray-200 mt-4 h-px w-full" />

          <div className="mt-6 flex items-start gap-4">
            <label className="flex cursor-pointer items-start gap-3 select-none">
              <div className="text-sm leading-6">
                <p className="text-brand-black font-medium">마케팅 수신 동의</p>
              </div>

              <input
                type="checkbox"
                checked={marketingAgree}
                onChange={(e) => setMarketingAgree(e.target.checked)}
                className={cn(
                  'border-brand-gray-300 mt-0.5 ml-2 h-4 w-4 rounded border',
                  'accent-brand-main'
                )}
              />

              <div className="text-brand-gray-400 text-sm leading-6">
                <p>
                  스터디고 스페셜한 소식을 이메일, 문자, 카카오 알림톡 등 다양한
                  채널로 받아봅니다.
                </p>
                <p className="text-brand-gray-300 mt-1 text-xs leading-5">
                  ※ 이용약관의 변경이나 관계법령에 따라 회원님께 안내되어야 할
                  중요 고지사항은
                  <br />
                  마케팅 수신 동의와 상관없이 안내될 수 있습니다.
                </p>
              </div>
            </label>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <button
            type="button"
            className="text-brand-gray-300 text-sm underline underline-offset-4"
            onClick={() => setIsWithdrawOpen(true)}
          >
            회원탈퇴
          </button>

          <Button
            type="button"
            variant="primary"
            size="reg"
            className="min-w-44"
            onClick={handleSave}
          >
            내 정보 저장하기
          </Button>
        </div>
      </section>

      <WithdrawFlowModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
      />
    </main>
  )
}
