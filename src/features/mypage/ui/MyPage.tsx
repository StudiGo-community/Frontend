'use client'

import { useMemo, useState } from 'react'
import { toast } from 'sonner'

import PostFilter, { type SortOption } from '@/features/mypage/ui/PostFilter'
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

const normalize = (v: unknown) =>
  String(v ?? '')
    .trim()
    .toLowerCase()

export default function MyPage() {
  const [tab, setTab] = useState<TabType>('post')
  const [page, setPage] = useState(1)

  const [selectedBoard, setSelectedBoard] = useState('')
  const [search, setSearch] = useState('')

  const [sortBy, setSortBy] = useState<SortOption>('latest')
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({})

  const timeline = useMemo<TimelineItem[]>(() => MY_TIMELINE, [])

  const filteredPosts = useMemo(() => {
    const board = normalize(selectedBoard)
    const q = normalize(search)

    return MY_POSTS.filter((p) => {
      const okBoard = !board || normalize(p.board) === board
      const okSearch =
        !q || normalize(p.title).includes(q) || normalize(p.author).includes(q)
      return okBoard && okSearch
    })
  }, [selectedBoard, search])

  const filteredLikes = useMemo(() => {
    const board = normalize(selectedBoard)
    const q = normalize(search)

    return MY_LIKES.filter((p) => {
      const okBoard = !board || normalize(p.board) === board
      const okSearch =
        !q || normalize(p.title).includes(q) || normalize(p.author).includes(q)
      return okBoard && okSearch
    })
  }, [selectedBoard, search])

  const filteredComments = useMemo(() => {
    const board = normalize(selectedBoard)
    const q = normalize(search)

    return MY_COMMENTS.filter((c) => {
      const okBoard = !board || normalize(c.board) === board
      const okSearch =
        !q ||
        normalize(c.postTitle).includes(q) ||
        normalize(c.content).includes(q)
      return okBoard && okSearch
    })
  }, [selectedBoard, search])

  const handleChangeTab = (nextTab: TabType) => {
    setTab(nextTab)
    setPage(1)
    setCheckedMap({})
  }

  const handleChangeSortBy = (next: SortOption) => {
    setSortBy(next)
    setPage(1)
    setCheckedMap({})
  }

  const handleChangeBoard = (value: string) => {
    setSelectedBoard(value)
    setPage(1)
    setCheckedMap({})
  }

  const handleChangeSearch = (value: string) => {
    setSearch(value)
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

  const totalPages = useMemo(() => {
    if (tab === 'comment') {
      const pageSize = 15
      return Math.max(1, Math.ceil(filteredComments.length / pageSize))
    }
    return 10
  }, [tab, filteredComments.length])

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
              onChangeBoard={handleChangeBoard}
              search={search}
              onChangeSearch={handleChangeSearch}
              sortBy={sortBy}
              onChangeSortBy={handleChangeSortBy}
            />
          </div>
        </div>

        <div className="mt-2">
          {tab === 'post' && (
            <MyPost
              items={filteredPosts}
              sortBy={sortBy}
              checkedMap={checkedMap}
              onToggleOne={handleToggleOne}
            />
          )}

          {tab === 'comment' && (
            <MyComment
              page={page}
              items={filteredComments}
              sortBy={sortBy}
              checkedMap={checkedMap}
              onToggleOne={handleToggleOne}
              profileImageSrc={MY_PROFILE.profileImageSrc}
            />
          )}

          {tab === 'like' && (
            <MyLike
              items={filteredLikes}
              sortBy={sortBy}
              checkedMap={checkedMap}
              onToggleOne={handleToggleOne}
            />
          )}
        </div>

        <div className="border-brand-gray-200 border-b" />
        <div className="my-14 flex justify-center">
          <Pagination
            page={page}
            totalPages={totalPages}
            onChangePage={setPage}
          />
        </div>
      </section>
    </div>
  )
}
