// 스키마 전 임시 타입

export type Post = {
  id: number
  title: string
  content: string
  category: 'Free' | 'Recruit' | 'Study'
  author: Author
  images: {
    id: number
    url: string
    order: number
  }[]
  likeCount: number
  commentCount: number
  viewCount: number
  isLiked: boolean
  createdAt: string
  updatedAt: string
  comments: Comment[]
}

export type Comment = {
  id: number
  author: Author
  content: string
  taggedNicknames: string[]
  createdAt: string
}

export type Author = {
  id: number
  nickname: string
  profileImageUrl: string
}

// TODO: 목록 조회에서 view_count 추가해달라 하기
export type Posts = {
  count: number
  next: string | null
  previous: string | null
  posts: (Omit<Post, 'images' | 'viewCount' | 'comments'> & {
    thumbnailImageUrl: string
    blindedReason: string | null
  })[]
}
