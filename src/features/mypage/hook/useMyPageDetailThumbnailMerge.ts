import { useMemo } from 'react'
import { useQueries } from '@tanstack/react-query'

import type { MyPagePostItem } from '@/entities/mypage/model/mypage-ui-types'
import { getPostDetailApi } from '@/entities/mypage/api/post-detail-api'
import { pickDetailThumbnail } from '@/features/mypage/lib/mypage-content-picker'

type TabType = 'post' | 'comment' | 'like'

export function useMyPagePostsWithDetailThumbnail(params: {
  tab: TabType
  isClientEnvironment: boolean
  basePosts: MyPagePostItem[]
}) {
  const { tab, isClientEnvironment, basePosts } = params

  const postIdentifiersNeedingDetailThumbnail = useMemo(() => {
    if (tab !== 'post') {
      return []
    }

    return basePosts
      .filter((postItem) => !postItem.thumbnail)
      .map((postItem) => postItem.id)
      .slice(0, 10)
  }, [tab, basePosts])

  const postDetailQueries = useQueries({
    queries: postIdentifiersNeedingDetailThumbnail.map((postIdentifier) => ({
      queryKey: ['post-detail', postIdentifier],
      queryFn: () => getPostDetailApi(postIdentifier),
      enabled: isClientEnvironment && tab === 'post',
      staleTime: 1000 * 60 * 10,
    })),
  })

  const postsWithMergedThumbnails = useMemo<MyPagePostItem[]>(() => {
    if (tab !== 'post') {
      return basePosts
    }

    const thumbnailUrlByPostIdentifierMap = new Map<number, string>()

    for (
      let queryIndex = 0;
      queryIndex < postIdentifiersNeedingDetailThumbnail.length;
      queryIndex += 1
    ) {
      const postIdentifier = postIdentifiersNeedingDetailThumbnail[queryIndex]
      const postDetailData = postDetailQueries[queryIndex]?.data

      if (!postDetailData) {
        continue
      }

      const thumbnailUrl = pickDetailThumbnail(postDetailData)
      if (thumbnailUrl) {
        thumbnailUrlByPostIdentifierMap.set(postIdentifier, thumbnailUrl)
      }
    }

    return basePosts.map((postItem) => ({
      ...postItem,
      thumbnail:
        postItem.thumbnail ||
        thumbnailUrlByPostIdentifierMap.get(postItem.id) ||
        '',
    }))
  }, [tab, basePosts, postIdentifiersNeedingDetailThumbnail, postDetailQueries])

  return { posts: postsWithMergedThumbnails }
}

export function useMyPageLikedPostsWithDetailThumbnail(params: {
  tab: TabType
  isClientEnvironment: boolean
  baseLikedPosts: MyPagePostItem[]
}) {
  const { tab, isClientEnvironment, baseLikedPosts } = params

  const likedPostIdentifiersNeedingDetailThumbnail = useMemo(() => {
    if (tab !== 'like') {
      return []
    }

    return baseLikedPosts
      .filter((postItem) => !postItem.thumbnail)
      .map((postItem) => postItem.id)
      .slice(0, 10)
  }, [tab, baseLikedPosts])

  const likedPostDetailQueries = useQueries({
    queries: likedPostIdentifiersNeedingDetailThumbnail.map(
      (postIdentifier) => ({
        queryKey: ['post-detail', postIdentifier],
        queryFn: () => getPostDetailApi(postIdentifier),
        enabled: isClientEnvironment && tab === 'like',
        staleTime: 1000 * 60 * 10,
      })
    ),
  })

  const likedPostsWithMergedThumbnails = useMemo<MyPagePostItem[]>(() => {
    if (tab !== 'like') {
      return baseLikedPosts
    }

    const thumbnailUrlByPostIdentifierMap = new Map<number, string>()

    for (
      let queryIndex = 0;
      queryIndex < likedPostIdentifiersNeedingDetailThumbnail.length;
      queryIndex += 1
    ) {
      const postIdentifier =
        likedPostIdentifiersNeedingDetailThumbnail[queryIndex]
      const postDetailData = likedPostDetailQueries[queryIndex]?.data

      if (!postDetailData) {
        continue
      }

      const thumbnailUrl = pickDetailThumbnail(postDetailData)
      if (thumbnailUrl) {
        thumbnailUrlByPostIdentifierMap.set(postIdentifier, thumbnailUrl)
      }
    }

    return baseLikedPosts.map((postItem) => ({
      ...postItem,
      thumbnail:
        postItem.thumbnail ||
        thumbnailUrlByPostIdentifierMap.get(postItem.id) ||
        '',
    }))
  }, [
    tab,
    baseLikedPosts,
    likedPostIdentifiersNeedingDetailThumbnail,
    likedPostDetailQueries,
  ])

  return { likedPosts: likedPostsWithMergedThumbnails }
}
