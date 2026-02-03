'use client'

import { useMemo, useState, type ComponentType } from 'react'
import PostFilter from '@/features/mypage/ui/PostFilter'
import MyPost from '@/features/mypage/ui/MyPost'
import MenuIcon from '@/features/mypage/assets/menu-icon.svg'
import { Pagination } from '@/shared/ui/pagination-je'
import Profile from '@/features/mypage/ui/Profile'
import TimeLine, { TimelineItem } from '@/features/mypage/ui/TimeLine'
import { MY_TIMELINE } from '@/shared/api/mocks/data/mypage-data'

type TabType = 'post' | 'comment' | 'like'

type MyInfoDraft = {
  nickname?: string
  marketingAgree?: boolean
  profileImage?: string | null
}

type ProfileOverrideProps = {
  nickname?: string
  profileImage?: string | null
  marketingAgree?: boolean
}

const MYINFO_STORAGE_KEY = 'studigo_myinfo_draft'

function getMyInfoDraft(): ProfileOverrideProps {
  if (typeof window === 'undefined') {
    return {
      nickname: undefined,
      marketingAgree: undefined,
      profileImage: undefined,
    }
  }

  try {
    const raw = localStorage.getItem(MYINFO_STORAGE_KEY)
    if (!raw) {
      return {
        nickname: undefined,
        marketingAgree: undefined,
        profileImage: undefined,
      }
    }

    const saved = JSON.parse(raw) as MyInfoDraft

    return {
      nickname: typeof saved.nickname === 'string' ? saved.nickname : undefined,
      marketingAgree:
        typeof saved.marketingAgree === 'boolean'
          ? saved.marketingAgree
          : undefined,
      profileImage:
        typeof saved.profileImage === 'string' || saved.profileImage === null
          ? saved.profileImage
          : undefined,
    }
  } catch {
    return {
      nickname: undefined,
      marketingAgree: undefined,
      profileImage: undefined,
    }
  }
}

export default function MyPage() {
  const [tab, setTab] = useState<TabType>('post')
  const [page, setPage] = useState(1)
  const [selectedBoard, setSelectedBoard] = useState('')
  const [search, setSearch] = useState('')

  const timeline = useMemo<TimelineItem[]>(() => MY_TIMELINE, [])

  const [profileOverride] = useState<ProfileOverrideProps>(() =>
    getMyInfoDraft()
  )

  const ProfileWithOverride =
    Profile as unknown as ComponentType<ProfileOverrideProps>

  return (
    <div className="bg-brand-white min-h-screen">
      <section className="pt-10">
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5">
          <div className="flex w-full flex-col items-center">
            <ProfileWithOverride
              nickname={profileOverride.nickname}
              profileImage={profileOverride.profileImage}
              marketingAgree={profileOverride.marketingAgree}
            />

            <div className="border-brand-gray-200 w-full pb-10">
              <div className="mx-auto max-w-6xl px-5">
                <TimeLine items={timeline} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-10">
        <div className="flex items-center justify-between">
          <h1 className="text-brand-black text-2xl font-black">마이페이지</h1>
          <span className="hidden sm:inline">
            <MenuIcon width={4} height={27} className="ml-2 block" />
          </span>
        </div>

        <div className="border-brand-gray-200 relative mt-6 border-b">
          <div className="flex items-end justify-between">
            <PostFilter
              tab={tab}
              onChangeTab={setTab}
              selectedBoard={selectedBoard}
              onChangeBoard={setSelectedBoard}
              search={search}
              onChangeSearch={setSearch}
            />
          </div>
        </div>

        <div className="mt-2">
          <MyPost />
        </div>

        <div className="border-brand-gray-200 border-b" />
        <div className="my-14 flex justify-center">
          <Pagination page={page} totalPages={10} onChangePage={setPage} />
        </div>
      </section>
    </div>
  )
}
