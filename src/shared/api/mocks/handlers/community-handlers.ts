import { http, HttpResponse } from 'msw'

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

const communityHandlers = [getQuiz, submitQuiz, getQuizResult]

export { communityHandlers }
