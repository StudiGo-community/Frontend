import { http, HttpResponse } from 'msw'

export type TimelineItem = {
  date: string
  day: string
  status: 'done' | 'fail' | 'go' | 'upcoming'
}

export type MyPagePostItem = {
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
}

export type MyCommentItem = {
  commentId: string
  postId: string | null
  postTitle: string | null
  content: string | null
  createdAt: string
}

export type MyPageProfile = {
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

// 프로필
export const MY_PROFILE: MyPageProfile = {
  nickname: 'Fortes42',
  email: 'fortelsv42@gmail.com',
  joinedAt: '2026.01.08',
  profileImageSrc: '/images/profiles/default-1.webp',
  balloonLeft: {
    title: '오늘도 힘내봐요!',
    subtitle: 'Hazlo lo mejor que puedas hoy también',
  },
  balloonRight: {
    title: 'STUDY GO !',
  },
}

// 타임라인
export const MY_TIMELINE: TimelineItem[] = [
  { date: '01.08', day: '목', status: 'done' },
  { date: '01.09', day: '금', status: 'done' },
  { date: '01.10', day: '토', status: 'fail' },
  { date: '01.11', day: '일', status: 'go' },
  { date: '01.12', day: '월', status: 'upcoming' },
  { date: '01.13', day: '화', status: 'upcoming' },
  { date: '01.14', day: '수', status: 'upcoming' },
]

// 내 게시글
export const MY_POSTS: MyPagePostItem[] = Array.from({ length: 10 }).map(
  (_, idx) => ({
    id: idx + 1,
    author: '흑백요리사',
    date: '2026.01.08',
    time: '02:35',
    title: '조리는 보이가 나타났다... 이제 우승을 곁들인..!',
    views: 1024,
    likes: 337,
    comments: 84,
    avatar: '/images/profiles/default-1.webp',
    thumbnail: '/images/mypage/post-example.png',
  })
)

// 내 댓글
export const MY_COMMENTS: MyCommentItem[] = Array.from({ length: 15 }).map(
  (_, i) => {
    const deleted = i === 4
    const longTitle =
      '조리는 보이가 나타났다... 이제 우승을 곁들인..! 조리는 보이가 나타났다... 이제 우승을 곁들인..! 조리는 보이가 나타났다... 이제 우승을 곁들인..!'
    return {
      commentId: `c_${i + 1}`,
      postId: deleted ? null : `p_${i + 1}`,
      postTitle: deleted
        ? null
        : i === 0
          ? longTitle
          : '조리는 보이가 나타났다... 이제 우승을 곁들인..!',
      content: 'fortes42 조림 요정 우승 각 떴다! '.repeat(6),
      createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 6).toISOString(),
    }
  }
)

// 좋아요
export const MY_LIKES: MyPagePostItem[] = Array.from({ length: 10 }).map(
  (_, idx) => ({
    id: idx + 1,
    author: '흑백요리사',
    date: '2026.01.08',
    time: '02:35',
    title: '(좋아요) 조리는 보이가 나타났다... 이제 우승을 곁들인..!',
    views: 1024,
    likes: 337,
    comments: 84,
    avatar: '/images/profiles/default-1.webp',
    thumbnail: '/images/mypage/post-example.png',
  })
)

export const mypageHandlers = [
  http.get('*/mypage/profile', () => HttpResponse.json(MY_PROFILE)),
  http.get('*/mypage/timeline', () => HttpResponse.json(MY_TIMELINE)),
  http.get('*/mypage/posts', () => HttpResponse.json(MY_POSTS)),
  http.get('*/mypage/likes', () => HttpResponse.json(MY_LIKES)),
  http.get('*/mypage/comments', () => HttpResponse.json(MY_COMMENTS)),
]
