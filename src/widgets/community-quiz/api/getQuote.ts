import { api } from '@/shared/api/client'
import { handleActionError } from '@/shared/api/handleActionError'
import { Quote, QuoteSchema } from '@/entities/quiz/model/schema'

export const getQuote = async (): Promise<Quote> => {
  try {
    const response = await api.get('/daily-quotes')

    return QuoteSchema.parse(response.data)
  } catch (error) {
    return handleActionError(error, '오늘의 문장을 불러오는데 실패했습니다.')
  }
}
