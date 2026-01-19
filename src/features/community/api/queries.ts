import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { queryKeys } from '@/features/community/api/query-keys'
import { getQuiz } from '@/features/community/api/api'
import { QuizResponse } from '@/features/community/model/schema'

type QuizQueryOptions = Omit<
  UseQueryOptions<QuizResponse>,
  'queryKey' | 'queryFn' | 'staleTime'
>

const getMsUntilMidnight = () => {
  const now = new Date()
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)

  return midnight.getTime() - now.getTime()
}

const useQuiz = (options?: QuizQueryOptions) => {
  return useQuery({
    queryKey: queryKeys.quiz(),
    queryFn: getQuiz,
    staleTime: getMsUntilMidnight(),
    ...options,
  })
}

export { useQuiz }
