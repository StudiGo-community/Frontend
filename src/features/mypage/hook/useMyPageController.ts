'use client'

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import { toast } from 'sonner'

import type { SortOption } from '@/features/mypage/ui/PostFilter'
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
import { useTimelineHistory } from '@/features/mypage/hook/useTimeline'

import { normalize } from '@/features/mypage/lib/text'
import {
  addDays,
  formatDateParts,
  startOfKoreaStandardTimeDay,
  toKoreanDay,
  toMonthDay,
  toYearMonthDay,
} from '@/features/mypage/lib/data-kst'

import type { TimelineItem } from '@/features/mypage/ui/TimeLine'

type TabType = 'post' | 'comment' | 'like'

const DEFAULT_THUMBNAIL = '/images/mypage/post-example.png'
const DEFAULT_AVATAR = '/images/profiles/default-1.webp'

export function useMyPageController() {
  const [tab, setTab] = useState<TabType>('post')
  const [page, setPage] = useState(1)

  const [selectedBoard, setSelectedBoard] = useState('')
  const [search, setSearch] = useState('')

  const [sortBy, setSortBy] = useState<SortOption>('latest')
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({})

  const sessionUser = useSessionStore((state) => state.user)

  // 기존 동작 유지: SSR 시점에는 user=null 유지
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

  const timelineHistoryQuery = useTimelineHistory(isClient)

  const noHistoryToastOnceRef = useRef(false)
  useEffect(() => {
    if (!timelineHistoryQuery.isSuccess) return
    if (noHistoryToastOnceRef.current) return

    const results = timelineHistoryQuery.data?.results ?? []
    if (results.length === 0) {
      noHistoryToastOnceRef.current = true
      toast('아직 출석 기록이 없습니다')
    }
  }, [timelineHistoryQuery.isSuccess, timelineHistoryQuery.data?.results])

  const timeline = useMemo<TimelineItem[]>(() => {
    const today = startOfKoreaStandardTimeDay()
    const results = timelineHistoryQuery.data?.results ?? []

    const submittedMap = new Map<string, boolean>()
    for (const resultItem of results) {
      submittedMap.set(resultItem.date, !!resultItem.is_submitted)
    }

    const items: TimelineItem[] = []
    for (let offsetDays = -3; offsetDays <= 3; offsetDays += 1) {
      const dateObject = addDays(today, offsetDays)
      const yearMonthDay = toYearMonthDay(dateObject)
      const submitted = submittedMap.get(yearMonthDay) ?? false

      let status: TimelineItem['status'] = 'upcoming'
      if (offsetDays > 0) status = 'upcoming'
      else if (offsetDays === 0) status = submitted ? 'done' : 'go'
      else status = submitted ? 'done' : 'fail'

      items.push({
        date: toMonthDay(dateObject),
        day: toKoreanDay(dateObject),
        status,
      })
    }

    return items
  }, [timelineHistoryQuery.data?.results])

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
    const profileImageUrl = user?.profileImageUrl
    const safeAvatar = profileImageUrl ?? DEFAULT_AVATAR

    return (myPostsQuery.data?.posts ?? []).map((postItem) => {
      const { date, time } = formatDateParts(postItem.createdAt)
      return {
        id: postItem.id,
        author,
        date,
        time,
        title: postItem.title,
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
    const profileImageUrl = user?.profileImageUrl
    const safeAvatar = profileImageUrl ?? DEFAULT_AVATAR

    return (likedPostsQuery.data?.posts ?? []).map((postItem) => {
      const createdAt = postItem.likedAt ?? postItem.createdAt ?? ''
      const { date, time } = formatDateParts(createdAt)
      return {
        id: postItem.id,
        author,
        date,
        time,
        title: postItem.title,
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
    const commentItems = myCommentsQuery.data?.comments ?? []
    return commentItems.map((commentItem) => {
      return {
        commentId: String(commentItem.id),
        postId: commentItem.postId == null ? null : String(commentItem.postId),
        postTitle: commentItem.postTitle ?? null,
        content: commentItem.content ?? null,
        createdAt: commentItem.createdAt,
        board: null,
      }
    })
  }, [myCommentsQuery.data?.comments])

  const filteredPosts = useMemo(() => {
    const normalizedBoard = normalize(selectedBoard)
    const normalizedSearch = normalize(search)

    return posts.filter((postItem) => {
      const matchesBoard =
        !normalizedBoard || normalize(postItem.board) === normalizedBoard
      const matchesSearch =
        !normalizedSearch ||
        normalize(postItem.title).includes(normalizedSearch) ||
        normalize(postItem.author).includes(normalizedSearch)

      return matchesBoard && matchesSearch
    })
  }, [posts, selectedBoard, search])

  const filteredLikes = useMemo(() => {
    const normalizedBoard = normalize(selectedBoard)
    const normalizedSearch = normalize(search)

    return likedPosts.filter((postItem) => {
      const matchesBoard =
        !normalizedBoard || normalize(postItem.board) === normalizedBoard
      const matchesSearch =
        !normalizedSearch ||
        normalize(postItem.title).includes(normalizedSearch) ||
        normalize(postItem.author).includes(normalizedSearch)

      return matchesBoard && matchesSearch
    })
  }, [likedPosts, selectedBoard, search])

  const filteredComments = useMemo(() => {
    const normalizedBoard = normalize(selectedBoard)
    const normalizedSearch = normalize(search)

    return comments.filter((commentItem) => {
      const matchesBoard =
        !normalizedBoard || normalize(commentItem.board) === normalizedBoard
      const matchesSearch =
        !normalizedSearch ||
        normalize(commentItem.postTitle).includes(normalizedSearch) ||
        normalize(commentItem.content).includes(normalizedSearch)

      return matchesBoard && matchesSearch
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

  const handleChangeSortBy = (nextSortBy: SortOption) => {
    setSortBy(nextSortBy)
    setPage(1)
    setCheckedMap({})
  }

  const handleChangeBoard = (nextBoard: string) => {
    setSelectedBoard(nextBoard)
    setPage(1)
    setCheckedMap({})
  }

  const handleChangeSearch = (nextSearch: string) => {
    setSearch(nextSearch)
    setPage(1)
    setCheckedMap({})
  }

  const handleToggleOne = (identifier: string) => {
    setCheckedMap((previous) => ({
      ...previous,
      [identifier]: !previous[identifier],
    }))
  }

  const actionLabel = tab === 'like' ? '해지하기' : '삭제하기'

  const handleClickAction = async () => {
    const selectedIdentifiers = Object.entries(checkedMap)
      .filter(([, selected]) => selected)
      .map(([identifier]) => Number(identifier))
      .filter((identifier) => Number.isFinite(identifier))

    const selectedCount = selectedIdentifiers.length

    if (selectedCount === 0) {
      toast.error('선택된 항목이 없습니다.')
      return
    }

    try {
      if (tab === 'post') {
        await deleteMyPosts.mutateAsync(selectedIdentifiers)
        toast.success('선택한 게시글을 삭제했습니다.')
        setCheckedMap({})
        return
      }

      if (tab === 'comment') {
        await deleteMyComments.mutateAsync(selectedIdentifiers)
        toast.success('선택한 댓글을 삭제했습니다.')
        setCheckedMap({})
        return
      }

      toast.success('좋아요를 해지했습니다.')
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

  return {
    tab,
    page,
    selectedBoard,
    search,
    sortBy,
    checkedMap,

    user,
    profile,
    timeline,
    filteredPosts,
    filteredComments,
    filteredLikes,
    totalPages,
    actionLabel,
    isCurrentTabLoading,

    setPage,
    handleChangeTab,
    handleChangeBoard,
    handleChangeSearch,
    handleChangeSortBy,
    handleToggleOne,
    handleClickAction,
  }
}
