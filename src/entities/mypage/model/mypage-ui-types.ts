export type BoardValue = 'popular' | 'recruit' | 'study' | 'free'

export interface MyPagePostItem {
  id: number
  author: string
  date: string
  time: string
  title: string
  views: number
  likes: number
  comments: number
  avatar: string
  thumbnail: string
  board: BoardValue
}

export interface MyCommentItem {
  commentId: string
  postId: string | null
  postTitle: string | null
  content: string | null
  createdAt: string
  board: BoardValue | null
}

export interface MyPageProfile {
  nickname: string
  email: string
  joinedAt: string
  profileImageSrc: string | null
  balloonLeft: {
    title: string
    subtitle: string
  }
  balloonRight: {
    title: string
  }
}
