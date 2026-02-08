'use client'

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import { toast } from 'sonner'
import { useQueries } from '@tanstack/react-query'

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
import { extractFirstImageUrl } from '@/features/mypage/lib/extract-first-image-url'
import { getPostDetailApi } from '@/entities/mypage/api/post-detail-api'

type TabType = 'post' | 'comment' | 'like'

const DEFAULT_AVATAR = '/images/profiles/default-1.webp'

function pickString(obj: unknown, key: string): string | undefined {
  if (!obj || typeof obj !== 'object') return undefined
  const rec = obj as Record<string, unknown>
  const value = rec[key]
  return typeof value === 'string' ? value : undefined
}

function pickFirstString(obj: unknown, keys: string[]): string {
  for (const k of keys) {
    const v = pickString(obj, k)
    if (v) return v
  }
  return ''
}

function pickContentPreview(obj: unknown): string {
  return pickFirstString(obj, ['contentPreview', 'content_preview'])
}

function pickDetailContent(detail: unknown): string {
  return pickFirstString(detail, [
    'content',
    'content_preview',
    'contentPreview',
  ])
}

function pickDetailThumbnail(detail: unknown): string {
  if (!detail || typeof detail !== 'object') return ''
  const rec = detail as Record<string, unknown>

  const thumb = rec['thumbnail_url']
  if (typeof thumb === 'string' && thumb.trim()) return thumb

  const images = rec['images']
  if (Array.isArray(images) && images.length > 0) {
    const first = images[0]
    if (typeof first === 'string' && first.trim()) return first
    if (first && typeof first === 'object') {
      const f = first as Record<string, unknown>
      const url =
        (typeof f['url'] === 'string' && f['url']) ||
        (typeof f['src'] === 'string' && f['src']) ||
        (typeof f['image_url'] === 'string' && f['image_url']) ||
        ''
      if (url) return url
    }
  }

  const content = pickDetailContent(detail)
  return extractFirstImageUrl(content)
}

export function useMyPageController() {
  const [tab, setTab] = useState<TabType>('post')
  const [page, setPage] = useState(1)

  const [selectedBoard, setSelectedBoard] = useState('')
  const [search, setSearch] = useState('')

  const [sortBy, setSortBy] = useState<SortOption>('latest')
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({})

  const sessionUser = useSessionStore((state) => state.user)

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
    for (const r of results) submittedMap.set(r.date, !!r.is_submitted)

    const items: TimelineItem[] = []
    for (let d = -3; d <= 3; d += 1) {
      const dateObject = addDays(today, d)
      const ymd = toYearMonthDay(dateObject)
      const submitted = submittedMap.get(ymd) ?? false

      let status: TimelineItem['status'] = 'upcoming'
      if (d > 0) status = 'upcoming'
      else if (d === 0) status = submitted ? 'done' : 'go'
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
      balloonRight: { title: 'STUDY GO !' },
    }
  }, [user?.email, user?.nickname, user?.profileImageUrl])

  const basePosts = useMemo<MyPagePostItem[]>(() => {
    const author = user?.nickname ?? ''
    const safeAvatar = user?.profileImageUrl ?? DEFAULT_AVATAR

    return (myPostsQuery.data?.posts ?? []).map((p) => {
      const { date, time } = formatDateParts(p.createdAt)
      const thumb = extractFirstImageUrl(pickContentPreview(p))
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
        thumbnail: thumb,
        board: 'free',
      }
    })
  }, [myPostsQuery.data?.posts, user?.nickname, user?.profileImageUrl])

  const baseLikedPosts = useMemo<MyPagePostItem[]>(() => {
    const author = user?.nickname ?? ''
    const safeAvatar = user?.profileImageUrl ?? DEFAULT_AVATAR

    return (likedPostsQuery.data?.posts ?? []).map((p) => {
      const createdAt = p.likedAt ?? p.createdAt ?? ''
      const { date, time } = formatDateParts(createdAt)
      const thumb = extractFirstImageUrl(pickContentPreview(p))
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
        thumbnail: thumb,
        board: 'free',
      }
    })
  }, [likedPostsQuery.data?.posts, user?.nickname, user?.profileImageUrl])

  const needDetailPostIds = useMemo(() => {
    if (tab !== 'post') return []
    return basePosts
      .filter((p) => !p.thumbnail)
      .map((p) => p.id)
      .slice(0, 10)
  }, [tab, basePosts])

  const needDetailLikeIds = useMemo(() => {
    if (tab !== 'like') return []
    return baseLikedPosts
      .filter((p) => !p.thumbnail)
      .map((p) => p.id)
      .slice(0, 10)
  }, [tab, baseLikedPosts])

  const postDetailQueries = useQueries({
    queries: needDetailPostIds.map((id) => ({
      queryKey: ['post-detail', id],
      queryFn: () => getPostDetailApi(id),
      enabled: isClient && tab === 'post',
      staleTime: 1000 * 60 * 10,
    })),
  })

  const likeDetailQueries = useQueries({
    queries: needDetailLikeIds.map((id) => ({
      queryKey: ['post-detail', id],
      queryFn: () => getPostDetailApi(id),
      enabled: isClient && tab === 'like',
      staleTime: 1000 * 60 * 10,
    })),
  })

  const posts = useMemo<MyPagePostItem[]>(() => {
    if (tab !== 'post') return basePosts

    const map = new Map<number, string>()
    for (let i = 0; i < needDetailPostIds.length; i += 1) {
      const id = needDetailPostIds[i]
      const detail = postDetailQueries[i]?.data
      if (!detail) continue
      const thumb = pickDetailThumbnail(detail)
      if (thumb) map.set(id, thumb)
    }

    return basePosts.map((p) => ({
      ...p,
      thumbnail: p.thumbnail || map.get(p.id) || '',
    }))
  }, [tab, basePosts, needDetailPostIds, postDetailQueries])

  const likedPosts = useMemo<MyPagePostItem[]>(() => {
    if (tab !== 'like') return baseLikedPosts

    const map = new Map<number, string>()
    for (let i = 0; i < needDetailLikeIds.length; i += 1) {
      const id = needDetailLikeIds[i]
      const detail = likeDetailQueries[i]?.data
      if (!detail) continue
      const thumb = pickDetailThumbnail(detail)
      if (thumb) map.set(id, thumb)
    }

    return baseLikedPosts.map((p) => ({
      ...p,
      thumbnail: p.thumbnail || map.get(p.id) || '',
    }))
  }, [tab, baseLikedPosts, needDetailLikeIds, likeDetailQueries])

  const comments = useMemo<MyCommentItem[]>(() => {
    const items = myCommentsQuery.data?.comments ?? []
    return items.map((c) => ({
      commentId: String(c.id),
      postId: c.postId == null ? null : String(c.postId),
      postTitle: c.postTitle ?? null,
      content: c.content ?? null,
      createdAt: c.createdAt,
      board: null,
    }))
  }, [myCommentsQuery.data?.comments])

  const filteredPosts = useMemo(() => {
    const b = normalize(selectedBoard)
    const s = normalize(search)
    return posts.filter((p) => {
      const okBoard = !b || normalize(p.board) === b
      const okSearch =
        !s || normalize(p.title).includes(s) || normalize(p.author).includes(s)
      return okBoard && okSearch
    })
  }, [posts, selectedBoard, search])

  const filteredLikes = useMemo(() => {
    const b = normalize(selectedBoard)
    const s = normalize(search)
    return likedPosts.filter((p) => {
      const okBoard = !b || normalize(p.board) === b
      const okSearch =
        !s || normalize(p.title).includes(s) || normalize(p.author).includes(s)
      return okBoard && okSearch
    })
  }, [likedPosts, selectedBoard, search])

  const filteredComments = useMemo(() => {
    const b = normalize(selectedBoard)
    const s = normalize(search)
    return comments.filter((c) => {
      const okBoard = !b || normalize(c.board) === b
      const okSearch =
        !s ||
        normalize(c.postTitle).includes(s) ||
        normalize(c.content).includes(s)
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
    const key = `${tab}:${message}`
    if (lastErrorKeyRef.current === key) return
    lastErrorKeyRef.current = key

    toast.error(
      message
        ? `마이페이지 데이터를 불러오지 못했습니다. (${message})`
        : '마이페이지 데이터를 불러오지 못했습니다.'
    )
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
    setCheckedMap((prev) => ({ ...prev, [identifier]: !prev[identifier] }))
  }

  const actionLabel = tab === 'like' ? '해지하기' : '삭제하기'

  const handleClickAction = async () => {
    const selectedIds = Object.entries(checkedMap)
      .filter(([, v]) => v)
      .map(([k]) => Number(k))
      .filter((n) => Number.isFinite(n))

    if (selectedIds.length === 0) {
      toast.error('선택된 항목이 없습니다.')
      return
    }

    try {
      if (tab === 'post') {
        await deleteMyPosts.mutateAsync(selectedIds)
        toast.success('선택한 게시글을 삭제했습니다.')
        setCheckedMap({})
        return
      }
      if (tab === 'comment') {
        await deleteMyComments.mutateAsync(selectedIds)
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
