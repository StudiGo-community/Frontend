import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { answerQuizAction } from '@/widgets/community-quiz/api/answerQuizAction'
import { QuizAnswerForm } from '@/entities/quiz/model/schema'

export function useAnswerQuizMutation() {
  return useMutation({
    mutationFn: (data: QuizAnswerForm) => answerQuizAction(data),
    onSuccess: () => {
      toast.success('퀴즈 정답이 제출되었습니다.')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
