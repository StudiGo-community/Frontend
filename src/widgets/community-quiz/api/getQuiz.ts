import { cookies } from 'next/headers'
import { api } from '@/shared/api/client'
import { handleActionError } from '@/shared/api/handleActionError'
import {
  BeforeQuizResponse,
  BeforeQuizResponseSchema,
  QuizAnswerResponse,
  QuizAnswerResponseSchema,
} from '@/entities/quiz/model/schema'

export const getQuiz = async (): Promise<
  BeforeQuizResponse | QuizAnswerResponse
> => {
  try {
    const cookieStore = await cookies()
    const response = await api.get(`/daily-questions`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    })

    const beforeQuizResult = BeforeQuizResponseSchema.safeParse(response.data)
    if (beforeQuizResult.success) {
      return beforeQuizResult.data
    }

    return QuizAnswerResponseSchema.parse(response.data)
  } catch (error) {
    return handleActionError(error, '오늘의 퀴즈를 불러오는데 실패했습니다.')
  }
}
