import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query'
import { queryKeys } from '@/features/community/api/query-keys'
import { getQuiz, submitQuiz } from '@/features/community/api/api'
import {
  QuizResponse,
  QuizSubmissionRequest,
  QuizSubmissionResponse,
} from '@/features/community/model/schema'
import { AxiosError } from 'axios'

// ---------- 퀴즈 조회 ----------
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

// ---------- 퀴즈 제출 ----------
type SubmitQuizOptions = Omit<
  UseMutationOptions<QuizSubmissionResponse, AxiosError, QuizSubmissionRequest>,
  'mutationFn'
>

const useSubmitQuiz = (options?: SubmitQuizOptions) => {
  return useMutation({
    mutationFn: submitQuiz,
    ...options,
  })
}

export { useQuiz, useSubmitQuiz }
