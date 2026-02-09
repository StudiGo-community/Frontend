'use client'

import { useMemo, useRef, useState, type ChangeEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import type { UserProfile } from '@/entities/mypage-my-information-fix/model/profile-fix-schema'
import {
  DEFAULT_PROFILE_IMAGE_URL,
  isDefaultProfileImageUrl,
} from '@/entities/mypage-my-information-fix/model/default-profile-images'

import { useMyProfile } from '@/features/mypage-my-information-fix/hook/useMyProfile'
import { usePatchMyProfile } from '@/features/mypage-my-information-fix/hook/usePatchMyProfile'
import { usePatchProfileImage } from '@/features/mypage-my-information-fix/hook/usePatchProfileImage'
import { useDeleteProfileImage } from '@/features/mypage-my-information-fix/hook/useDeleteProfileImage'
import { useChangePassword } from '@/features/mypage-my-information-fix/hook/useChangePassword'
import { useCheckNickname } from '@/features/mypage-my-information-fix/hook/useCheckNickname'

import { useSessionStore } from '@/entities/session/store/session-store'

import { WithdrawFlowModal } from './WithdrawFlowModal'

import {
  formatJoinedAt,
  mapUserRoleToUiRole,
} from '@/features/mypage-my-information-fix/lib/format'
import {
  validateNickname,
  validateNewPassword,
} from '@/features/mypage-my-information-fix/lib/validation'
import {
  getApiErrorMessageFromUnknownError,
  getHttpStatusFromUnknownError,
  normalizePasswordErrorMessage,
} from '@/features/mypage-my-information-fix/lib/error'

import { HeaderSection } from '@/features/mypage-my-information-fix/ui/sections/HeaderSection'
import { ProfileSection } from '@/features/mypage-my-information-fix/ui/sections/ProfileSection'
import { BasicInfoSection } from '@/features/mypage-my-information-fix/ui/sections/BasicInfoSection'
import { NicknameSection } from '@/features/mypage-my-information-fix/ui/sections/NicknameSection'
import { EmailSection } from '@/features/mypage-my-information-fix/ui/sections/EmailSection'
import { PhoneSection } from '@/features/mypage-my-information-fix/ui/sections/PhoneSection'
import { PasswordSection } from '@/features/mypage-my-information-fix/ui/sections/PasswordSection'
import { MarketingSection } from '@/features/mypage-my-information-fix/ui/sections/MarketingSection'
import { FooterSection } from '@/features/mypage-my-information-fix/ui/sections/FooterSection'
import { DefaultImageSelectorModal } from '@/features/mypage-my-information-fix/ui/DefaultImageSelectorModal'

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

function MyInformationFixContent({
  userProfile,
  onOpenWithdraw,
}: {
  userProfile: UserProfile
  onOpenWithdraw: () => void
}) {
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
        <HeaderSection title="내 정보 수정" />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ProfileSection
            selectedProfileImageUrl={selectedProfileImageUrl}
            profileBorderClass={profileBorderClass}
            fileInputRef={fileInputRef}
            onChangeFile={handleChangeFile}
            onClickUpload={handleClickUpload}
            onOpenDefaultImageSelector={() =>
              setIsDefaultImageSelectorOpen(true)
            }
          />

          <BasicInfoSection
            name={userProfile.name}
            joinedAtValue={joinedAtValue}
          />
        </div>

        <NicknameSection
          nickname={nickname}
          onChangeNickname={(next) => {
            setNickname(next)
            resetNicknameCheckState()
          }}
          onClickCheckNickname={handleClickCheckNickname}
          isCheckNicknamePending={isCheckNicknamePending}
          nicknameValidation={nicknameValidation}
          nicknameRuleTextColor={nicknameRuleTextColor}
          isNicknameChanged={isNicknameChanged}
          isNicknameCheckValid={isNicknameCheckValid}
        />

        <EmailSection email={userProfile.email} />
        <PhoneSection phone={userProfile.phone ?? ''} />

        <PasswordSection
          isPasswordEditing={isPasswordEditing}
          currentPassword={currentPassword}
          newPassword={newPassword}
          newPasswordConfirm={newPasswordConfirm}
          onChangeCurrentPassword={setCurrentPassword}
          onChangeNewPassword={setNewPassword}
          onChangeNewPasswordConfirm={setNewPasswordConfirm}
          onTogglePasswordEdit={togglePasswordEdit}
          passwordRuleTextColor={passwordRuleTextColor}
          newPasswordValidation={newPasswordValidation}
          isNewPasswordMismatch={isNewPasswordMismatch}
        />

        <MarketingSection
          marketingAgree={marketingAgree}
          onChangeMarketingAgree={setMarketingAgree}
        />

        <FooterSection
          onOpenWithdraw={onOpenWithdraw}
          onClickSave={handleSave}
          isSaving={isSaving}
        />
      </section>

      {isDefaultImageSelectorOpen && (
        <DefaultImageSelectorModal
          selectedProfileImageUrl={selectedProfileImageUrl}
          onClose={() => setIsDefaultImageSelectorOpen(false)}
          onSelect={handleSelectDefaultImage}
        />
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
      <MyInformationFixContent
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
