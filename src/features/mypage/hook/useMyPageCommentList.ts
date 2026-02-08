import { useMemo } from 'react'

import type { MyCommentItem } from '@/entities/mypage/model/mypage-ui-types'
import type { GetMyCommentsResponse } from '@/entities/mypage/model/my-comments-schema'

type CommentResponseItem = GetMyCommentsResponse['comments'][number]

export function useMyPageCommentsList(
  comments: GetMyCommentsResponse['comments'] | undefined
) {
  const mappedComments = useMemo<MyCommentItem[]>(() => {
    const items = comments ?? []

    return items.map((commentItem: CommentResponseItem) => ({
      commentId: String(commentItem.id),
      postId: commentItem.postId == null ? null : String(commentItem.postId),
      postTitle: commentItem.postTitle ?? null,
      content: commentItem.content ?? null,
      createdAt: commentItem.createdAt,
      board: null,
    }))
  }, [comments])

  return { comments: mappedComments }
}
