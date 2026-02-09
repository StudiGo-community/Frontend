'use client'

import Image from 'next/image'
import { useMemo, useRef, useState, type ChangeEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'

import { WithdrawFlowModal } from './WithdrawFlowModal'

import {
  DEFAULT_PROFILE_IMAGE_URL,
  DEFAULT_PROFILE_IMAGE_URL_LIST,
  isDefaultProfileImageUrl,
} from '@/entities/mypage-my-information-fix/model/default-profile-images'
import type { UserProfile } from '@/entities/mypage-my-information-fix/model/profile-fix-schema'

import { useMyProfile } from '@/features/mypage-my-information-fix/hook/useMyProfile'
import { usePatchMyProfile } from '@/features/mypage-my-information-fix/hook/usePatchMyProfile'
import { usePatchProfileImage } from '@/features/mypage-my-information-fix/hook/usePatchProfileImage'
import { useDeleteProfileImage } from '@/features/mypage-my-information-fix/hook/useDeleteProfileImage'
import { useChangePassword } from '@/features/mypage-my-information-fix/hook/useChangePassword'
import { useCheckNickname } from '@/features/mypage-my-information-fix/hook/useCheckNickname'
import { normalizeImageSrcForNextImage } from '@/entities/mypage-my-information-fix/lib/normalize-image-src'

import { useSessionStore } from '@/entities/session/store/session-store'

type UserRole = 'user' | 'admin' | 'instructor'

function formatJoinedAt(createdAt: string | undefined): string {
  if (!createdAt) return ''
  const datePart = createdAt.split('T')[0] ?? ''
  const [year, month, day] = datePart.split('-')
  if (!year || !month || !day) return ''
  return `${year}.${month}.${day}`
}

function mapUserRoleToUiRole(role: string | undefined): UserRole {
  if (!role) return 'user'
  const normalizedRole = role.toLowerCase()
  if (normalizedRole === 'admin') return 'admin'
  if (normalizedRole === 'instructor') return 'instructor'
  return 'user'
}

function validateNickname(nickname: string): {
  isLengthOk: boolean
  isCharacterOk: boolean
} {
  const isLengthOk = nickname.length >= 2 && nickname.length <= 12
  const isCharacterOk = /^[A-Za-z0-9가-힣]+$/.test(nickname)
  return { isLengthOk, isCharacterOk }
}

function validateNewPassword(newPassword: string): {
  isMinimumLengthOk: boolean
  isCombinationOk: boolean
} {
  const isMinimumLengthOk = newPassword.length >= 8
  const hasLetter = /[A-Za-z]/.test(newPassword)
  const hasNumber = /\d/.test(newPassword)
  const hasSpecialCharacter = /[^A-Za-z0-9]/.test(newPassword)
  const isCombinationOk = hasLetter && hasNumber && hasSpecialCharacter
  return { isMinimumLengthOk, isCombinationOk }
}

function getHttpStatusFromUnknownError(error: unknown): number | null {
  if (!error || typeof error !== 'object') return null
  const record = error as Record<string, unknown>

  const response = record['response']
  if (!response || typeof response !== 'object') return null

  const responseRecord = response as Record<string, unknown>
  const status = responseRecord['status']
  return typeof status === 'number' ? status : null
}

function getApiErrorMessageFromUnknownError(error: unknown): string | null {
  if (!error || typeof error !== 'object') return null
  const errorRecord = error as Record<string, unknown>

  const response = errorRecord['response']
  if (!response || typeof response !== 'object') return null

  const responseRecord = response as Record<string, unknown>
  const data = responseRecord['data']
  if (!data || typeof data !== 'object') return null

  const dataRecord = data as Record<string, unknown>

  const backendErrorMessage = dataRecord['error']
  if (
    typeof backendErrorMessage === 'string' &&
    backendErrorMessage.length > 0
  ) {
    return backendErrorMessage
  }

  const backendMessage = dataRecord['message']
  if (typeof backendMessage === 'string' && backendMessage.length > 0) {
    return backendMessage
  }

  const backendDetail = dataRecord['detail']
  if (typeof backendDetail === 'string' && backendDetail.length > 0) {
    return backendDetail
  }

  for (const value of Object.values(dataRecord)) {
    if (
      Array.isArray(value) &&
      value.every((item) => typeof item === 'string')
    ) {
      const joined = value.join('\n').trim()
      if (joined.length > 0) return joined
    }
  }

  return null
}

function normalizePasswordErrorMessage(backendMessage: string | null): string {
  if (!backendMessage) return '현재 비밀번호가 일치하지 않습니다'

  const normalized = backendMessage.trim()

  if (normalized.includes('소셜')) {
    return '소셜 로그인 계정은 비밀번호를 사용하지 않습니다'
  }

  if (normalized.includes('동일') && normalized.includes('비밀번호')) {
    return '현재 비밀번호와 동일합니다'
  }

  if (
    normalized.includes('현재 비밀번호') ||
    normalized.includes('기존 비밀번호') ||
    normalized.includes('올바르지') ||
    normalized.includes('틀')
  ) {
    return '현재 비밀번호가 일치하지 않습니다'
  }

  return normalized
}

function normalizeProfileImageUrlForApi(
  profileImageUrl: string
): string | null {
  if (/^https?:\/\//.test(profileImageUrl)) return profileImageUrl

  if (profileImageUrl.startsWith('/')) {
    if (typeof window === 'undefined') return null
    return `${window.location.origin}${profileImageUrl}`
  }

  return null
}

interface MyInformationFixFormProps {
  userProfile: UserProfile
  onOpenWithdraw: () => void
}

function MyInformationFixForm({
  userProfile,
  onOpenWithdraw,
}: MyInformationFixFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const patchUser = useSessionStore((state) => state.patchUser)

  const { mutateAsync: patchMyProfile, isPending: isPatchMyProfilePending } =
    usePatchMyProfile()
  const {
    mutateAsync: patchProfileImage,
    isPending: isPatchProfileImagePending,
  } = usePatchProfileImage()
  useDeleteProfileImage()
  const { mutateAsync: changePassword, isPending: isChangePasswordPending } =
    useChangePassword()
  const { mutateAsync: checkNickname, isPending: isCheckNicknamePending } =
    useCheckNickname()

  const userRole = mapUserRoleToUiRole(userProfile.role)
  const joinedAtValue = useMemo(
    () => formatJoinedAt(userProfile.created_at),
    [userProfile.created_at]
  )

  const [nickname, setNickname] = useState<string>(
    () => userProfile.nickname ?? ''
  )
  const [marketingAgree, setMarketingAgree] = useState<boolean>(true)

  const serverProfileImageUrl =
    typeof userProfile.profile_image_url === 'string' &&
    userProfile.profile_image_url.length > 0
      ? userProfile.profile_image_url
      : DEFAULT_PROFILE_IMAGE_URL

  const [hasTouchedProfileImage, setHasTouchedProfileImage] =
    useState<boolean>(false)
  const [localSelectedProfileImageUrl, setLocalSelectedProfileImageUrl] =
    useState<string>(serverProfileImageUrl)

  const selectedProfileImageUrl = hasTouchedProfileImage
    ? localSelectedProfileImageUrl
    : serverProfileImageUrl

  const [isDefaultImageSelectorOpen, setIsDefaultImageSelectorOpen] =
    useState<boolean>(false)

  const nicknameValidation = useMemo(
    () => validateNickname(nickname),
    [nickname]
  )
  const isNicknameRulesOk =
    nicknameValidation.isLengthOk && nicknameValidation.isCharacterOk

  const [isPasswordEditing, setIsPasswordEditing] = useState<boolean>(false)
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('')

  const newPasswordValidation = useMemo(
    () => validateNewPassword(newPassword),
    [newPassword]
  )
  const hasTypedNewPassword = isPasswordEditing && newPassword.length > 0

  const passwordRuleTextColor = (ok: boolean) => {
    if (!hasTypedNewPassword) return 'text-brand-gray-300'
    return ok ? 'text-brand-green' : 'text-brand-main'
  }

  const isNewPasswordMismatch =
    isPasswordEditing &&
    newPasswordConfirm.length > 0 &&
    newPassword !== newPasswordConfirm

  const profileBorderClass = {
    user: 'border-brand-green',
    admin: 'border-brand-purple',
    instructor: 'border-brand-blue',
  }[userRole]

  const isSaving =
    isPatchMyProfilePending ||
    isPatchProfileImagePending ||
    isChangePasswordPending

  const handleClickUpload = () => {
    toast.message('현재는 기본 이미지 선택만 지원합니다.')
    fileInputRef.current?.click()
  }

  const handleChangeFile: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error('최대 5MB까지 업로드 가능합니다.')
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    toast.message('현재는 기본 이미지 선택만 지원합니다.')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const togglePasswordEdit = () => {
    setIsPasswordEditing((prev) => {
      const next = !prev
      if (!next) {
        setCurrentPassword('')
        setNewPassword('')
        setNewPasswordConfirm('')
      }
      return next
    })
  }

  const nicknameRuleTextColor = (ok: boolean) => {
    if (nickname.length === 0) return 'text-brand-gray-300'
    return ok ? 'text-brand-green' : 'text-brand-main'
  }

  const handleSelectDefaultImage = (profileImageUrl: string) => {
    setHasTouchedProfileImage(true)
    setLocalSelectedProfileImageUrl(profileImageUrl)
    setIsDefaultImageSelectorOpen(false)
  }

  const isNicknameChanged = nickname !== userProfile.nickname

  const [nicknameCheckedValue, setNicknameCheckedValue] = useState<
    string | null
  >(null)
  const [nicknameCheckToken, setNicknameCheckToken] = useState<string | null>(
    null
  )
  const [isNicknameCheckValid, setIsNicknameCheckValid] =
    useState<boolean>(false)

  const nicknameExpireTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  )

  const clearNicknameExpireTimer = () => {
    if (nicknameExpireTimerRef.current) {
      clearTimeout(nicknameExpireTimerRef.current)
      nicknameExpireTimerRef.current = null
    }
  }

  const resetNicknameCheckState = () => {
    clearNicknameExpireTimer()
    setNicknameCheckedValue(null)
    setNicknameCheckToken(null)
    setIsNicknameCheckValid(false)
  }

  const scheduleNicknameExpire = (expiresInSec: number) => {
    clearNicknameExpireTimer()

    if (expiresInSec <= 0) {
      setIsNicknameCheckValid(false)
      return
    }

    nicknameExpireTimerRef.current = setTimeout(() => {
      setIsNicknameCheckValid(false)
    }, expiresInSec * 1000)
  }

  const handleClickCheckNickname = async () => {
    if (!isNicknameRulesOk) {
      toast.error('닉네임 형식을 확인해 주세요.')
      return
    }

    if (!isNicknameChanged) {
      toast.success('현재 사용 중인 닉네임입니다.')
      return
    }

    try {
      const result = await checkNickname({ nickname })

      setNicknameCheckedValue(nickname)
      setNicknameCheckToken(result.check_token)
      setIsNicknameCheckValid(true)
      scheduleNicknameExpire(result.expires_in)

      toast.success(result.message)
    } catch (error) {
      const backendMessage = getApiErrorMessageFromUnknownError(error)
      const errorMessage =
        backendMessage ??
        (error instanceof Error ? error.message : '닉네임 확인에 실패했습니다.')
      toast.error(errorMessage)
      resetNicknameCheckState()
    }
  }

  const handleSave = async () => {
    if (!isNicknameRulesOk) {
      toast.error('닉네임 형식을 확인해 주세요.')
      return
    }

    if (isNicknameChanged) {
      const isSameCheckedNickname = nicknameCheckedValue === nickname
      if (
        !isSameCheckedNickname ||
        !isNicknameCheckValid ||
        !nicknameCheckToken
      ) {
        toast.error('닉네임 중복 확인을 해주세요.')
        return
      }
    }

    if (isPasswordEditing) {
      if (currentPassword.length === 0) {
        toast.error('현재 비밀번호를 입력해 주세요.')
        return
      }

      if (newPassword.length === 0 || newPasswordConfirm.length === 0) {
        toast.error('새 비밀번호를 입력해 주세요.')
        return
      }

      if (currentPassword === newPassword) {
        toast.error('현재 비밀번호와 동일합니다')
        return
      }

      if (
        !newPasswordValidation.isMinimumLengthOk ||
        !newPasswordValidation.isCombinationOk
      ) {
        toast.error('새 비밀번호 형식을 확인해 주세요.')
        return
      }

      if (newPassword !== newPasswordConfirm) {
        toast.error('새 비밀번호가 일치하지 않습니다')
        return
      }
    }

    try {
      if (isNicknameChanged) {
        await patchMyProfile({ nickname })
        patchUser({ nickname })
      }

      if (selectedProfileImageUrl !== serverProfileImageUrl) {
        if (!isDefaultProfileImageUrl(selectedProfileImageUrl)) {
          toast.error('허용되지 않는 프로필 이미지입니다.')
          return
        }

        const apiProfileImageUrl = normalizeProfileImageUrlForApi(
          selectedProfileImageUrl
        )
        if (!apiProfileImageUrl) {
          toast.error('프로필 이미지 URL 형식이 올바르지 않습니다.')
          return
        }

        await patchProfileImage({ profile_image_url: apiProfileImageUrl })
        patchUser({ profileImageUrl: apiProfileImageUrl })
      }

      if (isPasswordEditing) {
        try {
          await changePassword({
            current_password: currentPassword,
            new_password: newPassword,
            new_password_confirm: newPasswordConfirm,
          })
          toast.success('비밀번호가 변경되었습니다')
        } catch (error) {
          const httpStatus = getHttpStatusFromUnknownError(error)
          const backendMessage = getApiErrorMessageFromUnknownError(error)

          if (httpStatus === 400 || httpStatus === 401) {
            toast.error(normalizePasswordErrorMessage(backendMessage))
            return
          }

          toast.error(normalizePasswordErrorMessage(backendMessage))
          return
        }
      }

      toast.success('내 정보가 저장되었습니다.')
      router.push('/mypage')
      router.refresh()
    } catch (error) {
      const backendMessage = getApiErrorMessageFromUnknownError(error)
      const errorMessage =
        backendMessage ??
        (error instanceof Error ? error.message : '저장에 실패했습니다.')
      toast.error(errorMessage)
    }
  }

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
                  src={normalizeImageSrcForNextImage(selectedProfileImageUrl)}
                  alt="프로필 이미지"
                  fill
                  sizes="144px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="text-brand-gray-300 pt-3 text-sm leading-7">
              <p>• 최대 5MB까지 업로드 가능합니다.</p>
              <p>• 확장자는 JPG, PNG 사용 가능합니다.</p>

              <div className="mt-4 flex items-center gap-3">
                <input
                  ref={fileInputRef}
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
                  onClick={() => setIsDefaultImageSelectorOpen(true)}
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
                <Input value={userProfile.name} disabled />
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
                onChange={(event) => {
                  setNickname(event.target.value)
                  resetNicknameCheckState()
                }}
                placeholder="닉네임을 입력해 주세요"
              />
            </div>

            <Button
              type="button"
              variant="secondary"
              size="md"
              className="min-w-32"
              onClick={handleClickCheckNickname}
              disabled={isCheckNicknamePending}
            >
              중복 확인
            </Button>
          </div>

          <div className="mt-3 text-xs leading-5">
            <p className={nicknameRuleTextColor(nicknameValidation.isLengthOk)}>
              ✓ 최소 2글자 최대 12글자
            </p>
            <p
              className={nicknameRuleTextColor(
                nicknameValidation.isCharacterOk
              )}
            >
              ✓ 한글, 영문, 숫자만 사용 가능 (특수문자, 공백 불가)
            </p>
            <p className="text-brand-green">✓ 금지어 포함 불가</p>

            {isNicknameChanged && (
              <p
                className={cn(
                  'mt-2',
                  isNicknameCheckValid ? 'text-brand-green' : 'text-brand-main'
                )}
              >
                {isNicknameCheckValid
                  ? '✓ 중복 확인 완료'
                  : '✕ 중복 확인이 필요합니다'}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <p className="text-brand-gray-400 mb-2 text-sm">이메일</p>
              <Input value={userProfile.email} disabled />
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
              <Input value={userProfile.phone ?? ''} disabled />
              <p className="text-brand-gray-300 mt-2 text-xs">
                전화번호는 보안 정책상 수정할 수 없습니다.
              </p>
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
              <p className="text-brand-gray-400 mb-2 text-sm">현재 비밀번호</p>
              <Input
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                placeholder="현재 비밀번호를 입력해 주세요."
                disabled={!isPasswordEditing}
              />
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
                <p className="text-brand-gray-400 mb-2 text-sm">새 비밀번호</p>

                <Input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="새 비밀번호를 입력해주세요."
                />

                <div className="mt-3 text-sm leading-6">
                  <p
                    className={cn(
                      passwordRuleTextColor(
                        newPasswordValidation.isMinimumLengthOk
                      )
                    )}
                  >
                    ✓ 최소 8글자
                  </p>
                  <p
                    className={cn(
                      passwordRuleTextColor(
                        newPasswordValidation.isCombinationOk
                      )
                    )}
                  >
                    ✓ 영문, 숫자, 특수문자 조합
                  </p>
                </div>
              </div>

              <div>
                <p className="text-brand-gray-400 mb-2 text-sm">
                  새 비밀번호 확인
                </p>

                <Input
                  type="password"
                  value={newPasswordConfirm}
                  onChange={(event) =>
                    setNewPasswordConfirm(event.target.value)
                  }
                  placeholder="새 비밀번호를 한 번 더 입력해주세요."
                />

                {isNewPasswordMismatch && (
                  <p className="text-brand-main mt-2 text-sm">
                    새 비밀번호가 일치하지 않습니다
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
                onChange={(event) => setMarketingAgree(event.target.checked)}
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
            onClick={onOpenWithdraw}
          >
            회원탈퇴
          </button>

          <Button
            type="button"
            variant="primary"
            size="reg"
            className="min-w-44"
            onClick={handleSave}
            disabled={isSaving}
          >
            내 정보 저장하기
          </Button>
        </div>
      </section>

      {isDefaultImageSelectorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <div className="bg-brand-white w-full max-w-lg rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-brand-black text-lg font-bold">
                기본 이미지 선택
              </h2>
              <button
                type="button"
                className="text-brand-gray-400 text-sm"
                onClick={() => setIsDefaultImageSelectorOpen(false)}
              >
                닫기
              </button>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-4">
              {DEFAULT_PROFILE_IMAGE_URL_LIST.map((profileImageUrl) => {
                const isSelected = profileImageUrl === selectedProfileImageUrl
                return (
                  <button
                    key={profileImageUrl}
                    type="button"
                    className={cn(
                      'relative aspect-square overflow-hidden rounded-full border-4',
                      isSelected ? 'border-brand-green' : 'border-transparent'
                    )}
                    onClick={() => handleSelectDefaultImage(profileImageUrl)}
                  >
                    <Image
                      src={normalizeImageSrcForNextImage(profileImageUrl)}
                      alt="기본 프로필 이미지"
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                )
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsDefaultImageSelectorOpen(false)}
              >
                취소
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export function MyInformationFix() {
  const { data: myProfileData, isLoading, isError } = useMyProfile()
  const [isWithdrawOpen, setIsWithdrawOpen] = useState<boolean>(false)

  const userProfile = myProfileData?.user

  if (isLoading) {
    return <div className="px-6 py-10">로딩 중입니다.</div>
  }

  if (isError || !userProfile) {
    return <div className="px-6 py-10">프로필 정보를 불러올 수 없습니다.</div>
  }

  return (
    <>
      <MyInformationFixForm
        key={userProfile.id}
        userProfile={userProfile}
        onOpenWithdraw={() => setIsWithdrawOpen(true)}
      />

      <WithdrawFlowModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
      />
    </>
  )
}
