// 게시글
export const MY_POSTS = [
  {
    id: 1,
    author: '흑백요리사',
    date: '2026.01.08',
    time: '02:35',
    title: '조리는 보이가 나타났다... 이제 우승을 곁들인..!',
    views: 1024,
    likes: 337,
    comments: 84,
    avatar: '/images/profiles/default-1.webp',
    thumbnail: '/images/mypage/post-example.png',
  },
]

// 타임라인
export type TimelineItem = {
  date: string
  day: string
  status: 'done' | 'fail' | 'go' | 'upcoming'
}

export const MY_TIMELINE: TimelineItem[] = [
  { date: '01.08', day: '목', status: 'done' },
  { date: '01.09', day: '금', status: 'done' },
  { date: '01.10', day: '토', status: 'fail' },
  { date: '01.11', day: '일', status: 'go' },
  { date: '01.12', day: '월', status: 'upcoming' },
  { date: '01.13', day: '화', status: 'upcoming' },
  { date: '01.14', day: '수', status: 'upcoming' },
]
