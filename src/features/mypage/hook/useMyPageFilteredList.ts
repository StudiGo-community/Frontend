import { useMemo } from 'react'
import type {
  MyCommentItem,
  MyPagePostItem,
} from '@/entities/mypage/model/mypage-ui-types'
import { normalize } from '@/features/mypage/lib/text'

export function useMyPageFilteredPosts(params: {
  posts: MyPagePostItem[]
  selectedBoard: string
  search: string
}) {
  const { posts, selectedBoard, search } = params

  const filteredPosts = useMemo(() => {
    const normalizedSelectedBoard = normalize(selectedBoard)
    const normalizedSearchText = normalize(search)

    return posts.filter((postItem) => {
      const boardMatches =
        normalizedSelectedBoard === '' ||
        normalize(postItem.board) === normalizedSelectedBoard

      const searchMatches =
        normalizedSearchText === '' ||
        normalize(postItem.title).includes(normalizedSearchText) ||
        normalize(postItem.author).includes(normalizedSearchText)

      return boardMatches && searchMatches
    })
  }, [posts, selectedBoard, search])

  return { filteredPosts }
}

export function useMyPageFilteredLikes(params: {
  likedPosts: MyPagePostItem[]
  selectedBoard: string
  search: string
}) {
  const { likedPosts, selectedBoard, search } = params

  const filteredLikes = useMemo(() => {
    const normalizedSelectedBoard = normalize(selectedBoard)
    const normalizedSearchText = normalize(search)

    return likedPosts.filter((postItem) => {
      const boardMatches =
        normalizedSelectedBoard === '' ||
        normalize(postItem.board) === normalizedSelectedBoard

      const searchMatches =
        normalizedSearchText === '' ||
        normalize(postItem.title).includes(normalizedSearchText) ||
        normalize(postItem.author).includes(normalizedSearchText)

      return boardMatches && searchMatches
    })
  }, [likedPosts, selectedBoard, search])

  return { filteredLikes }
}

export function useMyPageFilteredComments(params: {
  comments: MyCommentItem[]
  selectedBoard: string
  search: string
}) {
  const { comments, selectedBoard, search } = params

  const filteredComments = useMemo(() => {
    const normalizedSelectedBoard = normalize(selectedBoard)
    const normalizedSearchText = normalize(search)

    return comments.filter((commentItem) => {
      const boardMatches =
        normalizedSelectedBoard === '' ||
        normalize(commentItem.board) === normalizedSelectedBoard

      const searchMatches =
        normalizedSearchText === '' ||
        normalize(commentItem.postTitle).includes(normalizedSearchText) ||
        normalize(commentItem.content).includes(normalizedSearchText)

      return boardMatches && searchMatches
    })
  }, [comments, selectedBoard, search])

  return { filteredComments }
}
