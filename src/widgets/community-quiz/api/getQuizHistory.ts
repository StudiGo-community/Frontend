import { cookies } from 'next/headers'
import { api } from '@/shared/api/client'
import { handleActionError } from '@/shared/api/handleActionError'
import {
  QuizHistoryResponse,
  QuizHistoryResponseSchema,
} from '@/entities/quiz/model/schema'

export const getQuizHistory = async (): Promise<QuizHistoryResponse> => {
  try {
    const cookieStore = await cookies()
    const response = await api.get(`/daily-questions/history`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    })

    return QuizHistoryResponseSchema.parse(response.data)
  } catch (error) {
    return handleActionError(
      error,
      '오늘의 퀴즈 기록을 불러오는데 실패했습니다.'
    )
  }
}
