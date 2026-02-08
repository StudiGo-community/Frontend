import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import type { UseQueryResult } from '@tanstack/react-query'

type TabType = 'post' | 'comment' | 'like'

type QueryLike = Pick<UseQueryResult<unknown, unknown>, 'isError' | 'error'>

export function useMyPageErrorToast(params: {
  tab: TabType
  myPostsQuery: QueryLike
  myCommentsQuery: QueryLike
  likedPostsQuery: QueryLike
}) {
  const { tab, myPostsQuery, myCommentsQuery, likedPostsQuery } = params

  const lastErrorKeyRef = useRef<string | null>(null)

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

    if (lastErrorKeyRef.current === errorKey) {
      return
    }

    lastErrorKeyRef.current = errorKey

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
}
