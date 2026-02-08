import { useMemo } from 'react'

import type { MyPagePostItem } from '@/entities/mypage/model/mypage-ui-types'
import type { GetMyPostsResponse } from '@/entities/mypage/model/my-post-schema'
import type { GetLikesResponse } from '@/entities/mypage/model/my-likes-schema'

import { formatDateParts } from '@/features/mypage/lib/data-kst'
import { extractFirstImageUrl } from '@/features/mypage/lib/extract-first-image-url'
import {
  DEFAULT_AVATAR,
  pickContentPreview,
} from '@/features/mypage/lib/mypage-content-picker'

type UserLike = {
  nickname?: string | null
  profileImageUrl?: string | null
} | null

type MyPostsItem = GetMyPostsResponse['posts'][number]
type LikesItem = GetLikesResponse['posts'][number]

type CountFields = {
  viewCount?: number
  likeCount?: number
  commentCount?: number
  view_count?: number
  like_count?: number
  comment_count?: number
}

export function useMyPageBasePosts(params: {
  user: UserLike
  posts: GetMyPostsResponse['posts'] | undefined
}) {
  const { user, posts } = params

  const basePosts = useMemo<MyPagePostItem[]>(() => {
    const author = user?.nickname ?? ''
    const safeAvatar = user?.profileImageUrl ?? DEFAULT_AVATAR

    return (posts ?? []).map((postItem: MyPostsItem) => {
      const { date, time } = formatDateParts(postItem.createdAt)
      const thumb = extractFirstImageUrl(pickContentPreview(postItem))

      const counts = postItem as unknown as CountFields

      return {
        id: postItem.id,
        author,
        date,
        time,
        title: postItem.title,
        views: counts.viewCount ?? counts.view_count ?? 0,
        likes: counts.likeCount ?? counts.like_count ?? 0,
        comments: counts.commentCount ?? counts.comment_count ?? 0,
        avatar: safeAvatar,
        thumbnail: thumb,
        board: 'free',
      }
    })
  }, [posts, user?.nickname, user?.profileImageUrl])

  return { basePosts }
}

export function useMyPageBaseLikedPosts(params: {
  user: UserLike
  posts: GetLikesResponse['posts'] | undefined
}) {
  const { user, posts } = params

  const baseLikedPosts = useMemo<MyPagePostItem[]>(() => {
    const author = user?.nickname ?? ''
    const safeAvatar = user?.profileImageUrl ?? DEFAULT_AVATAR

    return (posts ?? []).map((postItem: LikesItem) => {
      const createdAt = postItem.likedAt ?? postItem.createdAt ?? ''
      const { date, time } = formatDateParts(createdAt)
      const thumb = extractFirstImageUrl(pickContentPreview(postItem))

      const counts = postItem as unknown as CountFields

      return {
        id: postItem.id,
        author,
        date,
        time,
        title: postItem.title,
        views: counts.viewCount ?? counts.view_count ?? 0,
        likes: counts.likeCount ?? counts.like_count ?? 0,
        comments: counts.commentCount ?? counts.comment_count ?? 0,
        avatar: safeAvatar,
        thumbnail: thumb,
        board: 'free',
      }
    })
  }, [posts, user?.nickname, user?.profileImageUrl])

  return { baseLikedPosts }
}
