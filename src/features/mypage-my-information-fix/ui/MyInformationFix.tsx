'use client'

import * as React from 'react'
import Image from 'next/image'

import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'

type UserRole = 'user' | 'admin' | 'instructor'

export function MyInformationFix() {
  const fileRef = React.useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)

  const userRole: UserRole = 'user' // TODO: 실제 유저 role로 교체
  const [nickname, setNickname] = React.useState('fortes42')
  const nameValue = '박진우'
  const joinedAtValue = '2026.01.08'
  const emailValue = 'forteslv42@gmail.com'
  const phoneValue = '01012345678'
  const [marketingAgree, setMarketingAgree] = React.useState(true)

  // TODO: globals.css의 실제 클래스명에 맞게 여기만 바꿔주면 됨
  const profileBorderClass = {
    user: 'border-brand-green',
    admin: 'border-brand-purple',
    instructor: 'border-brand-blue',
  }[userRole]

  const handleClickUpload = () => {
    fileRef.current?.click()
  }

  const handleChangeFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return url
    })
  }

  const handleClickResetImage = () => {
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    if (fileRef.current) fileRef.current.value = ''
  }

  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

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
              onClick={() => {
                // TODO: 닉네임 중복 확인 API 연결
                alert('중복 확인 (UI 더미)')
              }}
            >
              중복 확인
            </Button>
          </div>

          <div className="text-brand-gray-300 mt-3 text-xs leading-5">
            <p>✓ 최소 2글자 최대 12글자</p>
            <p>✓ 한글,영문, 숫자만 사용 가능(특수문자, 공백 불가)</p>
            <p>✓ 금지어 포함 불가</p>
          </div>
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
              <Input type="password" value="***************" readOnly />
            </div>

            <Button
              type="button"
              variant="secondary"
              size="md"
              className="min-w-32"
              onClick={() => {
                // TODO: 비밀번호 변경 플로우 연결(모달/페이지 등)
                alert('비밀번호 변경 (UI 더미)')
              }}
            >
              비밀번호 변경
            </Button>
          </div>
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
                  'border-brand-gray-300 mt-1 ml-10 h-4 w-4 rounded border',
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
            onClick={() => {
              // TODO: 회원탈퇴 페이지/모달 연결
              alert('회원탈퇴 (UI 더미)')
            }}
          >
            회원탈퇴
          </button>

          <Button
            type="button"
            variant="primary"
            size="reg"
            className="min-w-44"
            onClick={() => {
              // TODO: 저장 API 연결
              alert('내 정보 저장하기 (UI 더미)')
            }}
          >
            내 정보 저장하기
          </Button>
        </div>
      </section>
    </main>
  )
}
