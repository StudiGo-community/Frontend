import { PostFormData } from '@/shared/api/schema/postSchema'
import { http, HttpResponse } from 'msw'

// interface PostDetail extends PostFormData {
//   id: number
//   author: {
//     id: number
//     nickname: string
//     profile_image_url: string
//   }
//   like_count: number
//   comment_count: number
//   view_count: number
//   is_liked: boolean
//   created_at: string
//   updated_at: string
//   comments: string[]
// }

const CURRENT_USER_ID = 10

const posts = [
  {
    id: 1,
    title:
      '흑백요리사2 백수저 손종원 셰프 누구? 프로필·결혼·레스토랑 한 눈 정리',
    content: `
      <img src="https://cdn.example.com/chef.png" alt="손종원 셰프" />
      <p>넷플릭스 흑백요리사 시즌2가 공개된 이후...</p>
    `,
    category: 'Free',
    author: {
      id: 10,
      nickname: 'mju',
      profile_image_url: 'https://cdn.example.com/profile.png',
    },
    images: [{ id: 101, url: 'https://cdn.example.com/chef.png', order: 1 }],
    like_count: 337,
    comment_count: 84,
    view_count: 1024,
    is_liked: false,
    created_at: '2026-01-08T02:35:00+09:00',
    updated_at: '2026-01-08T02:35:00+09:00',
    comments: [],
  },
]

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// ---------- 게시글 등록 (POST) ----------
// const createPost = http.post(
//   `${BASE_URL}/api/v1/posts`,
//   async ({ request }) => {
//     const newPostData = (await request.json()) as PostFormData

//     const newPost = {
//       ...newPostData,
//       id: posts.length + 1,
//       author: {
//         id: CURRENT_USER_ID,
//         nickname: 'mju',
//         profile_image_url: 'https://cdn.example.com/profile.png',
//       },
//       images: newPostData.images.map((img, index) => ({
//         id: 1000 + index,
//         ...img,
//       })),
//       created_at: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
//       updated_at: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
//       likes_count: 0,
//       comments_count: 0,
//       views_count: 0,
//       is_liked: false,
//       comments: [],
//       category: newPostData.category || 'Free',
//     }

//     // @ts-expect-error: Mock array type consistency for demo purposes
//     posts.push(newPost)
//     return HttpResponse.json(newPost, { status: 201 })
//   }
// )

// ---------- 게시글 목록 조회 (GET) ----------
// const getPosts = http.get(`${BASE_URL}/api/v1/posts/:id`, ({ params }) => {
//   const { id } = params
//   const post = posts.find((p) => p.id === Number(id))

//   if (!post) {
//     return HttpResponse.json(
//       { detail: '게시글을 찾을 수 없습니다.' },
//       { status: 404 }
//     )
//   }
//   return HttpResponse.json(post)
// })

// // ---------- 게시글 상세 조회 (GET) ----------
// const getPostDetail = http.get(`${BASE_URL}/api/v1/posts/:id`, ({ params }) => {
//   const { id } = params
//   const post = posts.find((p) => p.id === Number(id))

//   if (!post) {
//     return HttpResponse.json(
//       { detail: '게시글을 찾을 수 없습니다.' },
//       { status: 404 }
//     )
//   }
//   return HttpResponse.json(post)
// })

// ---------- 게시글 좋아요 토글 (POST) ----------
// const toggleLike = http.post(
//   `${BASE_URL}/api/v1/posts/:id/like`,
//   ({ params }) => {
//     const post = posts.find((p) => p.id === Number(params.id))
//     if (post) {
//       post.is_liked = !post.is_liked
//       post.like_count += post.is_liked ? 1 : -1
//       return HttpResponse.json({
//         post_id: post.id,
//         liked: post.is_liked,
//         like_count: post.like_count,
//       })
//     }
//     return new HttpResponse(null, { status: 404 })
//   }
// )

// ---------- 게시글 신고 (POST) ----------
// const reportPost = http.post(
//   `${BASE_URL}/api/v1/posts/:id/report`,
//   async ({ params, request }) => {
//     const { id } = params
//     const { reason } = (await request.json()) as { reason: string }

//     return HttpResponse.json(
//       {
//         message: `${id}번 게시글이 '${reason}' 사유로 신고 접수되었습니다.`,
//       },
//       { status: 200 }
//     )
//   }
// )

// ---------- 게시글 수정 (PATCH) ----------
// const updatePost = http.patch(
//   `${BASE_URL}/api/v1/posts/:id`,
//   async ({ params, request }) => {
//     const { id } = params
//     const body = (await request.json()) as Partial<PostFormData>
//     const index = posts.findIndex((p) => p.id === Number(id))

//     if (index !== -1) {
//       const updatedImages = body.images
//         ? body.images.map((img, i) => ({ id: 2000 + i, ...img }))
//         : posts[index].images

//       posts[index] = {
//         ...posts[index],
//         ...body,
//         images: updatedImages,
//         updated_at: new Date().toISOString(),
//       }

//       return HttpResponse.json(
//         { detail: '게시글을 찾을 수 없습니다.' },
//         { status: 404 }
//       )
//     }
//   }
// )

// ---------- 게시글 삭제 (DELETE) ----------
// const deletePost = http.delete(`${BASE_URL}/api/v1/posts/:id`, ({ params }) => {
//   const index = posts.findIndex((p) => p.id === Number(params.id))
//   if (index !== -1) {
//     posts.splice(index, 1)
//     return new HttpResponse(null, { status: 204 })
//   }
//   return new HttpResponse(null, { status: 404 })
// })

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
  // createPost,
  // getPosts,
  // getPostDetail,
  // toggleLike,
  // reportPost,
  // updatePost,
  // deletePost,
  getQuiz,
  submitQuiz,
  getQuizResult,
]

export { communityHandlers }
