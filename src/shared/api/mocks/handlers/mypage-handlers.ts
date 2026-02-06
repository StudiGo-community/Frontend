import { http, HttpResponse } from 'msw'

export type TimelineItem = {
  date: string
  day: string
  status: 'done' | 'fail' | 'go' | 'upcoming'
}

export type BoardValue = 'popular' | 'recruit' | 'study' | 'free'

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
  board: BoardValue
}

export type MyCommentItem = {
  commentId: string
  postId: string | null
  postTitle: string | null
  content: string | null
  createdAt: string
  board: BoardValue | null
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

const pad2 = (n: number) => String(n).padStart(2, '0')

const formatDate = (d: Date) => {
  const yyyy = d.getFullYear()
  const mm = pad2(d.getMonth() + 1)
  const dd = pad2(d.getDate())
  return `${yyyy}.${mm}.${dd}`
}

const formatTime = (d: Date) => {
  const hh = pad2(d.getHours())
  const min = pad2(d.getMinutes())
  return `${hh}:${min}`
}

const BOARDS: BoardValue[] = ['popular', 'recruit', 'study', 'free']

// 내 게시글
export const MY_POSTS: MyPagePostItem[] = Array.from({ length: 10 }).map(
  (_, idx) => {
    const base = new Date('2026-01-04T09:10:00')
    const d = new Date(base.getTime() + idx * 1000 * 60 * 60 * 14) // 14시간 간격

    return {
      id: idx + 1,
      board: BOARDS[idx % BOARDS.length],
      author:
        idx % 3 === 0 ? '흑백요리사' : idx % 3 === 1 ? 'Fortes42' : '요리왕',
      date: formatDate(d),
      time: formatTime(d),
      title:
        idx % 2 === 0
          ? `조리는 보이가 나타났다... 이제 우승을 곁들인..! (${idx + 1})`
          : `연습 기록 공유합니다 - 오늘의 회고 (${idx + 1})`,
      views: 800 + idx * 37,
      likes: 120 + idx * 9,
      comments: 20 + idx * 3,
      avatar: '/images/profiles/default-1.webp',
      thumbnail: '/images/mypage/post-example.png',
    }
  }
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
      board: deleted ? null : BOARDS[i % BOARDS.length],
    }
  }
)

// 좋아요
export const MY_LIKES: MyPagePostItem[] = Array.from({ length: 10 }).map(
  (_, idx) => {
    const base = new Date('2026-01-15T22:40:00')
    const d = new Date(base.getTime() - idx * 1000 * 60 * 60 * 9)

    return {
      id: idx + 101,
      board: BOARDS[idx % BOARDS.length],
      author:
        idx % 3 === 0
          ? '흑백요리사'
          : idx % 3 === 1
            ? '자유게시판장인'
            : '스터디고',
      date: formatDate(d),
      time: formatTime(d),
      title:
        idx % 2 === 0
          ? `(좋아요) 오늘 공부 루틴 공유 (${idx + 1})`
          : `(좋아요) 조리는 보이가 나타났다... (${idx + 1})`,
      views: 900 + idx * 21,
      likes: 200 + idx * 11,
      comments: 10 + idx * 2,
      avatar: '/images/profiles/default-1.webp',
      thumbnail: '/images/mypage/post-example.png',
    }
  }
)

export const mypageHandlers = [
  http.get('*/mypage/profile', () => HttpResponse.json(MY_PROFILE)),
  http.get('*/mypage/timeline', () => HttpResponse.json(MY_TIMELINE)),
  http.get('*/mypage/posts', () => HttpResponse.json(MY_POSTS)),
  http.get('*/mypage/likes', () => HttpResponse.json(MY_LIKES)),
  http.get('*/mypage/comments', () => HttpResponse.json(MY_COMMENTS)),
]
