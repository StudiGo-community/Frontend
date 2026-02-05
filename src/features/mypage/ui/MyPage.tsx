'use client'

import { useMemo, useState } from 'react'
import { toast } from 'sonner'

import PostFilter from '@/features/mypage/ui/PostFilter'
import MyPost from '@/features/mypage/ui/MyPost'
import MyComment from '@/features/mypage/ui/MyComment'
import MyLike from '@/features/mypage/ui/MyLike'
import MyPageActionMenu from '@/features/mypage/ui/MyPageActionMenu'
import { Pagination } from '@/shared/ui/pagination-je'
import Profile from '@/features/mypage/ui/Profile'
import TimeLine, { TimelineItem } from '@/features/mypage/ui/TimeLine'
import {
  MY_COMMENTS,
  MY_LIKES,
  MY_POSTS,
  MY_PROFILE,
  MY_TIMELINE,
} from '@/shared/api/mocks/handlers/mypage-handlers'

type TabType = 'post' | 'comment' | 'like'

export default function MyPage() {
  const [tab, setTab] = useState<TabType>('post')
  const [page, setPage] = useState(1)

  const [selectedBoard, setSelectedBoard] = useState('')
  const [search, setSearch] = useState('')

  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({})

  const timeline = useMemo<TimelineItem[]>(() => MY_TIMELINE, [])

  const handleChangeTab = (nextTab: TabType) => {
    setTab(nextTab)
    setPage(1)
    setCheckedMap({})
  }

  const handleToggleOne = (id: string) => {
    setCheckedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const actionLabel = tab === 'like' ? '해지하기' : '삭제하기'

  const handleClickAction = () => {
    const selectedCount = Object.values(checkedMap).filter(Boolean).length

    if (selectedCount === 0) {
      toast.error('선택된 항목이 없습니다.')
      return
    }

    toast.success(
      tab === 'like'
        ? '선택한 좋아요를 해지했습니다.'
        : '선택한 항목을 삭제했습니다.'
    )

    setCheckedMap({})
  }

  return (
    <div className="bg-brand-white min-h-screen">
      <section className="pt-10">
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5">
          <div className="flex w-full flex-col items-center">
            <Profile profile={MY_PROFILE} />

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

          <MyPageActionMenu
            label={actionLabel}
            onClickAction={handleClickAction}
          />
        </div>

        <div className="border-brand-gray-200 relative mt-6 border-b">
          <div className="flex items-end justify-between">
            <PostFilter
              tab={tab}
              onChangeTab={handleChangeTab}
              selectedBoard={selectedBoard}
              onChangeBoard={setSelectedBoard}
              search={search}
              onChangeSearch={setSearch}
            />
          </div>
        </div>

        <div className="mt-2">
          {tab === 'post' && (
            <MyPost
              items={MY_POSTS}
              checkedMap={checkedMap}
              onToggleOne={handleToggleOne}
            />
          )}

          {tab === 'comment' && (
            <MyComment
              page={page}
              items={MY_COMMENTS}
              sortBy="latest"
              checkedMap={checkedMap}
              onToggleOne={handleToggleOne}
              profileImageSrc={MY_PROFILE.profileImageSrc}
            />
          )}

          {tab === 'like' && (
            <MyLike
              items={MY_LIKES}
              checkedMap={checkedMap}
              onToggleOne={handleToggleOne}
            />
          )}
        </div>

        <div className="border-brand-gray-200 border-b" />

        <div className="my-14 flex justify-center">
          <Pagination page={page} totalPages={10} onChangePage={setPage} />
        </div>
      </section>
    </div>
  )
}
