import { PostFormData } from '@/shared/api/schema/postSchema'
import { http, HttpResponse } from 'msw'

const posts = [
  {
    id: '1',
    title:
      '흑백요리사2 백수저 손종원 셰프 누구? 프로필·결혼·레스토랑 한 눈 정리',
    content: '<p>중앙 정렬될 본문 내용입니다...</p>',
    category: 'Free',
    author: '흑백요리사2',
    created_at: '2026.01.08 02:35',
    views: 1024,
    likes: 337,
    comments_count: 84,
  },
]

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// ---------- 게시글 목록 조회 (GET) ----------
const getPosts = http.get(`${BASE_URL}/api/v1/posts`, () => {
  return HttpResponse.json(posts)
})

// ---------- 게시글 등록 (POST) ----------
const createPost = http.post(
  `${BASE_URL}/api/v1/posts`,
  async ({ request }) => {
    const newPostData = (await request.json()) as PostFormData

    const newPost = {
      ...newPostData,
      id: String(posts.length + 1),
      author: '나(테스트 유저)',
      created_at: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
      views: 0,
      likes: 0,
      comments_count: 0,
      category: newPostData.category || 'Free',
    }

    posts.push(newPost)
    return HttpResponse.json(newPost, { status: 201 })
  }
)

// ---------- 게시글 상세 조회 (GET) ----------
const getPostDetail = http.get(`${BASE_URL}/api/v1/posts/:id`, ({ params }) => {
  const { id } = params
  const post = posts.find((p) => p.id === id)
  if (!post) return new HttpResponse(null, { status: 404 })
  return HttpResponse.json(post)
})

// ---------- 퀴즈 조회 ----------
const getQuiz = http.get(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/daily-questions/today`,
  () => {
    return HttpResponse.json({
      question_date: '2026-01-20',
      daily_question_id: 501,
      question: {
        id: 3001,
        title: 'SQL 기본',
        description: '다음 질문에 답하세요.',
        prompt: 'SELECT 문에서 조건을 거는 키워드는 ______ 이다.',
      },
      expires_at: '2026-01-21T00:00:00+09:00',
    })
  }
)

// ---------- 퀴즈 제출 ----------
const submitQuiz = http.post(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/daily-questions/today/submission`,
  async ({ request }) => {
    const { submitted_answer_text } = (await request.json()) as {
      submitted_answer_text: string
    }

    if (submitted_answer_text.trim().toUpperCase() === 'WHERE') {
      return HttpResponse.json({
        date: '2026-01-13',
        question_id: 3001,
        submission: {
          id: 8001,
          submitted_at: '2026-01-13T15:30:00+09:00',
          is_correct: true,
        },
        answer_test: 'WHERE',
        explanation: 'WHERE은 SELECT 문에서 조건을 거는 키워드이다.',
        attendance: {
          id: 12001,
          created_date: '2026-01-13',
          created_at: '2026-01-13T15:30:00+09:00',
        },
      })
    }
    if (submitted_answer_text.trim().toUpperCase() !== 'WHERE') {
      return HttpResponse.json({
        date: '2026-01-13',
        question_id: 3001,
        submission: {
          id: 8001,
          submitted_at: '2026-01-13T15:30:00+09:00',
          is_correct: false,
        },
        answer_test: 'WHERE',
        explanation: 'WHERE은 SELECT 문에서 조건을 거는 키워드이다.',
        attendance: {
          id: 12001,
          created_date: '2026-01-13',
          created_at: '2026-01-13T15:30:00+09:00',
        },
      })
    }
    // return HttpResponse.json({ detail: '인증이 필요합니다.' }, { status: 401 })
  }
)

// ---------- 퀴즈 결과 조회 ----------
const getQuizResult = http.get(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/daily-questions/today/result`,
  () => {
    return HttpResponse.json({
      question_date: '2026-01-13',
      status: 'COMPLETED',
      daily_question_id: 501,
      question: {
        id: 3001,
        title: 'SQL 기본',
        description: '다음 질문에 답하세요.',
        prompt: 'SELECT 문에서 조건을 거는 키워드는 ______ 이다.',
      },
      submission: {
        id: 8001,
        submitted_at: '2026-01-13T15:30:00+09:00',
        is_correct: true,
      },
      explanation: '정답은 WHERE 입니다. 조건절을 의미합니다.',
    })
    // return HttpResponse.json(
    //   {
    //     detail: '오늘의 문제를 제출한 후 결과를 확인할 수 있습니다.',
    //   },
    //   { status: 409 }
    // )
  }
)

const communityHandlers = [
  getPosts,
  createPost,
  getPostDetail,
  getQuiz,
  submitQuiz,
  getQuizResult,
]

export { communityHandlers }
