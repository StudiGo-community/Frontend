import {
  QuizResponseSchema,
  QuizSubmissionResponseSchema,
  QuizResultResponseSchema,
  type QuizResponse,
  type QuizSubmissionRequest,
  type QuizSubmissionResponse,
  type QuizResultResponse,
} from '@/features/community/model/schema'
import { api } from '@/shared/api/client'

// ---------- 퀴즈 조회 ----------
export const getQuiz = async (): Promise<QuizResponse> => {
  const response = await api.get('/daily-questions/today')
  return QuizResponseSchema.parse(response.data)
}

// ---------- 퀴즈 제출 ----------
export const submitQuiz = async ({
  submittedAnswerText,
}: QuizSubmissionRequest): Promise<QuizSubmissionResponse> => {
  const response = await api.post('/daily-questions/today/submission', {
    submitted_answer_text: submittedAnswerText,
  })
  return QuizSubmissionResponseSchema.parse(response.data)
}

// ---------- 퀴즈 결과 조회 ----------
export const getQuizResult = async (): Promise<QuizResultResponse> => {
  const response = await api.get('/daily-questions/today/result')
  return QuizResultResponseSchema.parse(response.data)
}
