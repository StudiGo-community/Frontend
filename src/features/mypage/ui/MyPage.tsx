'use client'

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import { toast } from 'sonner'

import PostFilter, { type SortOption } from '@/features/mypage/ui/PostFilter'
import MyPost from '@/features/mypage/ui/MyPost'
import MyComment from '@/features/mypage/ui/MyComment'
import MyLike from '@/features/mypage/ui/MyLike'
import MyPageActionMenu from '@/features/mypage/ui/MyPageActionMenu'
import { Pagination } from '@/shared/ui/pagination-je'
import Profile from '@/features/mypage/ui/Profile'
import TimeLine, { TimelineItem } from '@/features/mypage/ui/TimeLine'
import type {
  MyCommentItem,
  MyPagePostItem,
} from '@/entities/mypage/model/mypage-ui-types'
import { useSessionStore } from '@/entities/session/store/session-store'
import { useMyPosts } from '@/features/mypage/hook/useMyPost'
import { useMyComments } from '@/features/mypage/hook/useMyComments'
import { useLikedPosts } from '@/features/mypage/hook/useLikes'
import { useDeleteMyPosts } from '@/features/mypage/hook/useDeleteMyPost'
import { useDeleteMyComments } from '@/features/mypage/hook/useDeleteMyComments'
import { MY_TIMELINE } from '@/shared/api/mocks/handlers/mypage-handlers'

type TabType = 'post' | 'comment' | 'like'

const normalize = (v: unknown) =>
  String(v ?? '')
    .trim()
    .toLowerCase()

const formatDateParts = (input: string): { date: string; time: string } => {
  const dateObj = new Date(input)
  if (Number.isNaN(dateObj.getTime())) return { date: '', time: '' }
  const yyyy = dateObj.getFullYear()
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0')
  const dd = String(dateObj.getDate()).padStart(2, '0')
  const hh = String(dateObj.getHours()).padStart(2, '0')
  const min = String(dateObj.getMinutes()).padStart(2, '0')
  return { date: `${yyyy}.${mm}.${dd}`, time: `${hh}:${min}` }
}

const DEFAULT_THUMBNAIL = '/images/mypage/post-example.png'
const DEFAULT_AVATAR = '/images/profiles/default-1.webp'

const MyPage = () => {
  const [tab, setTab] = useState<TabType>('post')
  const [page, setPage] = useState(1)

  const [selectedBoard, setSelectedBoard] = useState('')
  const [search, setSearch] = useState('')

  const [sortBy, setSortBy] = useState<SortOption>('latest')
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({})

  const sessionUser = useSessionStore((s) => s.user)
  const isClient = useSyncExternalStore(
    (onStoreChange) => {
      queueMicrotask(onStoreChange)
      return () => {}
    },
    () => true,
    () => false
  )

  const user = isClient ? sessionUser : null

  const myPostsQuery = useMyPosts(
    { page, size: 10, sort: sortBy },
    { enabled: isClient && tab === 'post' }
  )
  const myCommentsQuery = useMyComments(
    { page, size: 15, sort: sortBy },
    { enabled: isClient && tab === 'comment' }
  )
  const likedPostsQuery = useLikedPosts(
    { page, size: 10, sort: sortBy },
    { enabled: isClient && tab === 'like' }
  )

  const deleteMyPosts = useDeleteMyPosts()
  const deleteMyComments = useDeleteMyComments()

  const lastErrorKeyRef = useRef<string | null>(null)

  const timeline = useMemo<TimelineItem[]>(() => MY_TIMELINE, [])

  const profile = useMemo(() => {
    return {
      nickname: user?.nickname ?? '',
      email: user?.email ?? '',
      joinedAt: '-',
      profileImageSrc: user?.profileImageUrl ?? null,
      balloonLeft: {
        title: '오늘도 힘내봐요!',
        subtitle: 'Hazlo lo mejor que puedas hoy también',
      },
      balloonRight: {
        title: 'STUDY GO !',
      },
    }
  }, [user?.email, user?.nickname, user?.profileImageUrl])

  const posts = useMemo<MyPagePostItem[]>(() => {
    const author = user?.nickname ?? ''
    const avatar = user?.profileImageUrl
    const safeAvatar = avatar ?? DEFAULT_AVATAR

    return (myPostsQuery.data?.posts ?? []).map((p) => {
      const { date, time } = formatDateParts(p.createdAt)
      return {
        id: p.id,
        author,
        date,
        time,
        title: p.title,
        views: 0,
        likes: 0,
        comments: 0,
        avatar: safeAvatar,
        thumbnail: DEFAULT_THUMBNAIL,
        board: 'free',
      }
    })
  }, [myPostsQuery.data?.posts, user?.nickname, user?.profileImageUrl])

  const likedPosts = useMemo<MyPagePostItem[]>(() => {
    const author = user?.nickname ?? ''
    const avatar = user?.profileImageUrl
    const safeAvatar = avatar ?? DEFAULT_AVATAR

    return (likedPostsQuery.data?.posts ?? []).map((p) => {
      const createdAt = p.likedAt ?? p.createdAt ?? ''
      const { date, time } = formatDateParts(createdAt)
      return {
        id: p.id,
        author,
        date,
        time,
        title: p.title,
        views: 0,
        likes: 0,
        comments: 0,
        avatar: safeAvatar,
        thumbnail: DEFAULT_THUMBNAIL,
        board: 'free',
      }
    })
  }, [likedPostsQuery.data?.posts, user?.nickname, user?.profileImageUrl])

  const comments = useMemo<MyCommentItem[]>(() => {
    const safe = myCommentsQuery.data?.comments ?? []
    return safe.map((c) => {
      return {
        commentId: String(c.id),
        postId: c.postId == null ? null : String(c.postId),
        postTitle: c.postTitle ?? null,
        content: c.content ?? null,
        createdAt: c.createdAt,
        board: null,
      }
    })
  }, [myCommentsQuery.data?.comments])

  const filteredPosts = useMemo(() => {
    const board = normalize(selectedBoard)
    const q = normalize(search)

    return posts.filter((p) => {
      const okBoard = !board || normalize(p.board) === board
      const okSearch =
        !q || normalize(p.title).includes(q) || normalize(p.author).includes(q)
      return okBoard && okSearch
    })
  }, [posts, selectedBoard, search])

  const filteredLikes = useMemo(() => {
    const board = normalize(selectedBoard)
    const q = normalize(search)

    return likedPosts.filter((p) => {
      const okBoard = !board || normalize(p.board) === board
      const okSearch =
        !q || normalize(p.title).includes(q) || normalize(p.author).includes(q)
      return okBoard && okSearch
    })
  }, [likedPosts, selectedBoard, search])

  const filteredComments = useMemo(() => {
    const board = normalize(selectedBoard)
    const q = normalize(search)

    return comments.filter((c) => {
      const okBoard = !board || normalize(c.board) === board
      const okSearch =
        !q ||
        normalize(c.postTitle).includes(q) ||
        normalize(c.content).includes(q)
      return okBoard && okSearch
    })
  }, [comments, selectedBoard, search])

  useEffect(() => {
    const isError =
      (tab === 'post' && myPostsQuery.isError) ||
      (tab === 'comment' && myCommentsQuery.isError) ||
      (tab === 'like' && likedPostsQuery.isError)

    if (!isError) {
      lastErrorKeyRef.current = null
      return
    }

    const error =
      (tab === 'post' && myPostsQuery.error) ||
      (tab === 'comment' && myCommentsQuery.error) ||
      (tab === 'like' && likedPostsQuery.error)

    const message =
      error instanceof Error ? error.message : error ? String(error) : ''
    const errorKey = `${tab}:${message}`

    if (lastErrorKeyRef.current === errorKey) return
    lastErrorKeyRef.current = errorKey

    if (message) {
      console.error('[MyPage] query error:', error)
      toast.error(`마이페이지 데이터를 불러오지 못했습니다. (${message})`)
    } else {
      toast.error('마이페이지 데이터를 불러오지 못했습니다.')
    }
  }, [
    tab,
    myPostsQuery.error,
    myPostsQuery.isError,
    myCommentsQuery.error,
    myCommentsQuery.isError,
    likedPostsQuery.error,
    likedPostsQuery.isError,
  ])

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

  const handleClickAction = async () => {
    const selectedIds = Object.entries(checkedMap)
      .filter(([, v]) => v)
      .map(([id]) => Number(id))
      .filter((id) => Number.isFinite(id))

    const selectedCount = selectedIds.length

    if (selectedCount === 0) {
      toast.error('선택된 항목이 없습니다.')
      return
    }

    try {
      if (tab === 'post') {
        await deleteMyPosts.mutateAsync(selectedIds)
        toast.success('선택한 항목을 삭제했습니다.')
        setCheckedMap({})
        return
      }

      if (tab === 'comment') {
        await deleteMyComments.mutateAsync(selectedIds)
        toast.success('선택한 항목을 삭제했습니다.')
        setCheckedMap({})
        return
      }

      toast.success('선택한 좋아요를 해지했습니다.')
      setCheckedMap({})
    } catch {
      toast.error('요청 처리에 실패했습니다.')
    }
  }

  const totalPages = useMemo(() => {
    if (tab === 'post') return myPostsQuery.data?.pagination.totalPages ?? 1
    if (tab === 'comment')
      return myCommentsQuery.data?.pagination.totalPages ?? 1
    if (tab === 'like') return likedPostsQuery.data?.pagination.totalPages ?? 1
    return 1
  }, [
    tab,
    myPostsQuery.data?.pagination.totalPages,
    myCommentsQuery.data?.pagination.totalPages,
    likedPostsQuery.data?.pagination.totalPages,
  ])

  const isCurrentTabLoading =
    !isClient ||
    (tab === 'post' && myPostsQuery.isLoading) ||
    (tab === 'comment' && myCommentsQuery.isLoading) ||
    (tab === 'like' && likedPostsQuery.isLoading)

  return (
    <div className="bg-brand-white min-h-screen">
      <section className="pt-10">
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5">
          <div className="flex w-full flex-col items-center">
            <Profile profile={profile} />

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
          {tab === 'post' &&
            (isCurrentTabLoading ? (
              <div className="py-14 text-center">
                <p className="text-brand-gray-500 text-sm">Loading...</p>
              </div>
            ) : (
              <MyPost
                items={filteredPosts}
                sortBy={sortBy}
                checkedMap={checkedMap}
                onToggleOne={handleToggleOne}
              />
            ))}

          {tab === 'comment' &&
            (isCurrentTabLoading ? (
              <div className="py-14 text-center">
                <p className="text-brand-gray-500 text-sm">Loading...</p>
              </div>
            ) : (
              <MyComment
                items={filteredComments}
                sortBy={sortBy}
                checkedMap={checkedMap}
                onToggleOne={handleToggleOne}
                profileImageSrc={user?.profileImageUrl ?? null}
              />
            ))}

          {tab === 'like' &&
            (isCurrentTabLoading ? (
              <div className="py-14 text-center">
                <p className="text-brand-gray-500 text-sm">Loading...</p>
              </div>
            ) : (
              <MyLike
                items={filteredLikes}
                sortBy={sortBy}
                checkedMap={checkedMap}
                onToggleOne={handleToggleOne}
              />
            ))}
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

export default MyPage
