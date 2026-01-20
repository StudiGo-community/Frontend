export const queryKeys = {
  all: ['community'] as const,
  quiz: () => [...queryKeys.all, 'quiz'] as const,
  quizResult: () => [...queryKeys.quiz(), 'result'] as const,
}
