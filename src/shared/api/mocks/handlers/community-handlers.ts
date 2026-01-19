import { http, HttpResponse } from 'msw'

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

const communityHandlers = [getQuiz]

export { communityHandlers }
