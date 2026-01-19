import {
  QuizResponseSchema,
  type QuizResponse,
} from '@/features/community/model/schema'
import { api } from '@/shared/api/client'

export const getQuiz = async (): Promise<QuizResponse> => {
  const response = await api.get('/daily-questions/today')
  return QuizResponseSchema.parse(response.data)
}
