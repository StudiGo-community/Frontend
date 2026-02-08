import { useMemo } from 'react'
import { useQueries } from '@tanstack/react-query'

import type { MyPagePostItem } from '@/entities/mypage/model/mypage-ui-types'
import { getPostDetailApi } from '@/entities/mypage/api/post-detail-api'
import { pickDetailThumbnail } from '@/features/mypage/lib/mypage-content-picker'

export function useMyPagePostsWithDetailThumbnail(params: {
  tab: 'post' | 'comment' | 'like'
  isClient: boolean
  basePosts: MyPagePostItem[]
}) {
  const { tab, isClient, basePosts } = params

  const needDetailPostIds = useMemo(() => {
    if (tab !== 'post') return []
    return basePosts
      .filter((p) => !p.thumbnail)
      .map((p) => p.id)
      .slice(0, 10)
  }, [tab, basePosts])

  const postDetailQueries = useQueries({
    queries: needDetailPostIds.map((id) => ({
      queryKey: ['post-detail', id],
      queryFn: () => getPostDetailApi(id),
      enabled: isClient && tab === 'post',
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

  return { posts }
}

export function useMyPageLikedPostsWithDetailThumbnail(params: {
  tab: 'post' | 'comment' | 'like'
  isClient: boolean
  baseLikedPosts: MyPagePostItem[]
}) {
  const { tab, isClient, baseLikedPosts } = params

  const needDetailLikeIds = useMemo(() => {
    if (tab !== 'like') return []
    return baseLikedPosts
      .filter((p) => !p.thumbnail)
      .map((p) => p.id)
      .slice(0, 10)
  }, [tab, baseLikedPosts])

  const likeDetailQueries = useQueries({
    queries: needDetailLikeIds.map((id) => ({
      queryKey: ['post-detail', id],
      queryFn: () => getPostDetailApi(id),
      enabled: isClient && tab === 'like',
      staleTime: 1000 * 60 * 10,
    })),
  })

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

  return { likedPosts }
}
