'use client'

import { useMemo, useState, useSyncExternalStore } from 'react'
import { toast } from 'sonner'

import type { SortOption } from '@/features/mypage/ui/PostFilter'

import { useSessionStore } from '@/entities/session/store/session-store'

import { useMyPosts } from '@/features/mypage/hook/useMyPost'
import { useMyComments } from '@/features/mypage/hook/useMyComments'
import { useLikedPosts } from '@/features/mypage/hook/useLikes'
import { useDeleteMyPosts } from '@/features/mypage/hook/useDeleteMyPost'
import { useDeleteMyComments } from '@/features/mypage/hook/useDeleteMyComments'

import { useMyPageTimeline } from '@/features/mypage/hook/useMyPageTimeline'
import { useMyPageProfile } from '@/features/mypage/hook/useMyPageProfile'
import {
  useMyPageBaseLikedPosts,
  useMyPageBasePosts,
} from '@/features/mypage/hook/useMyPageBaselist'
import {
  useMyPageLikedPostsWithDetailThumbnail,
  useMyPagePostsWithDetailThumbnail,
} from '@/features/mypage/hook/useMyPageDetailThumbnailMerge'
import { useMyPageCommentsList } from '@/features/mypage/hook/useMyPageCommentList'
import {
  useMyPageFilteredComments,
  useMyPageFilteredLikes,
  useMyPageFilteredPosts,
} from '@/features/mypage/hook/useMyPageFilteredList'
import { useMyPageErrorToast } from '@/features/mypage/hook/useMyPageErrorToast'

type TabType = 'post' | 'comment' | 'like'

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

  const isClientEnvironment = isClient
  const user = isClientEnvironment ? sessionUser : null

  const myPostsQuery = useMyPosts(
    { page, size: 10, sort: sortBy },
    { enabled: isClientEnvironment && tab === 'post' }
  )
  const myCommentsQuery = useMyComments(
    { page, size: 15, sort: sortBy },
    { enabled: isClientEnvironment && tab === 'comment' }
  )
  const likedPostsQuery = useLikedPosts(
    { page, size: 10, sort: sortBy },
    { enabled: isClientEnvironment && tab === 'like' }
  )

  const deleteMyPosts = useDeleteMyPosts()
  const deleteMyComments = useDeleteMyComments()

  const { timeline } = useMyPageTimeline(isClientEnvironment)
  const { profile } = useMyPageProfile(user)

  const { basePosts } = useMyPageBasePosts({
    user,
    posts: myPostsQuery.data?.posts,
  })

  const { baseLikedPosts } = useMyPageBaseLikedPosts({
    user,
    posts: likedPostsQuery.data?.posts,
  })

  const { posts } = useMyPagePostsWithDetailThumbnail({
    tab,
    isClientEnvironment,
    basePosts,
  })

  const { likedPosts } = useMyPageLikedPostsWithDetailThumbnail({
    tab,
    isClientEnvironment,
    baseLikedPosts,
  })

  const { comments } = useMyPageCommentsList(myCommentsQuery.data?.comments)

  const { filteredPosts } = useMyPageFilteredPosts({
    posts,
    selectedBoard,
    search,
  })

  const { filteredLikes } = useMyPageFilteredLikes({
    likedPosts,
    selectedBoard,
    search,
  })

  const { filteredComments } = useMyPageFilteredComments({
    comments,
    selectedBoard,
    search,
  })

  useMyPageErrorToast({
    tab,
    myPostsQuery,
    myCommentsQuery,
    likedPostsQuery,
  })

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
    setCheckedMap((previousCheckedMap) => ({
      ...previousCheckedMap,
      [identifier]: !previousCheckedMap[identifier],
    }))
  }

  const actionLabel = tab === 'like' ? '해지하기' : '삭제하기'

  const handleClickAction = async () => {
    const selectedIdNumbers = Object.entries(checkedMap)
      .filter(([, isSelected]) => isSelected)
      .map(([identifier]) => Number(identifier))
      .filter((selectedIdNumber) => Number.isFinite(selectedIdNumber))

    if (selectedIdNumbers.length === 0) {
      toast.error('선택된 항목이 없습니다.')
      return
    }

    try {
      if (tab === 'post') {
        await deleteMyPosts.mutateAsync(selectedIdNumbers)
        toast.success('선택한 게시글을 삭제했습니다.')
        setCheckedMap({})
        return
      }

      if (tab === 'comment') {
        await deleteMyComments.mutateAsync(selectedIdNumbers)
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
    if (tab === 'post') {
      return myPostsQuery.data?.pagination.totalPages ?? 1
    }

    if (tab === 'comment') {
      return myCommentsQuery.data?.pagination.totalPages ?? 1
    }

    if (tab === 'like') {
      return likedPostsQuery.data?.pagination.totalPages ?? 1
    }

    return 1
  }, [
    tab,
    myPostsQuery.data?.pagination.totalPages,
    myCommentsQuery.data?.pagination.totalPages,
    likedPostsQuery.data?.pagination.totalPages,
  ])

  const isCurrentTabLoading =
    !isClientEnvironment ||
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
