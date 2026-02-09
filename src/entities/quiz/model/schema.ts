import z from 'zod'

// ---------- 퀴즈 ----------
// 파츠
export const QuizSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  description: z.string().nullable(),
  prompt: z.string(),
})

// 오늘의 퀴즈 제출
// 요청
export const QuizAnswerFormSchema = z.object({
  submittedAnswerText: z
    .string()
    .min(1, '답변을 입력해주세요')
    .max(100, '답변은 100자 이내로 입력해주세요'),
})

export type QuizAnswerForm = z.infer<typeof QuizAnswerFormSchema>

// 응답
export const QuizAnswerResponseSchema = z
  .object({
    date: z.string(),
    explanation: z.string(),
    answer_correct: z.string(),
    answer_user: z.string(),
    is_correct: z.boolean(),
  })
  .transform((data) => ({
    date: new Date(data.date),
    explanation: data.explanation,
    correctAnswer: data.answer_correct,
    userAnswer: data.answer_user,
    isCorrect: data.is_correct,
  }))

export type QuizAnswerResponse = z.infer<typeof QuizAnswerResponseSchema>

// 오늘의 퀴즈 조회
// 문제 풀기 이전
export const BeforeQuizResponseSchema = z
  .object({
    question_date: z.string(),
    daily_question_id: z.number().int().positive(),
    question: QuizSchema,
    expires_at: z.string(),
  })
  .transform((data) => ({
    questionDate: new Date(data.question_date),
    dailyQuestionId: data.daily_question_id,
    question: data.question,
    expiresAt: new Date(data.expires_at),
  }))

export type BeforeQuizResponse = z.infer<typeof BeforeQuizResponseSchema>

// 문제 푼 이후
export type AfterQuizResponse = QuizAnswerResponse

// 참여 기록 조회
export const QuizHistoryItemSchema = z
  .object({
    date: z.string(),
    is_submitted: z.boolean(),
  })
  .transform((data) => ({
    date: new Date(data.date),
    isSubmitted: data.is_submitted,
  }))

export const QuizHistoryResponseSchema = z.object({
  results: z.array(QuizHistoryItemSchema),
})

export type QuizHistoryResponse = z.infer<typeof QuizHistoryResponseSchema>

// ---------- 문장 ----------
export const QuoteSchema = z
  .object({
    date: z.string(),
    quotes: z.object({
      es: z.string(),
      ko: z.string(),
    }),
    refreshed_at: z.string(),
  })
  .transform((data) => ({
    date: new Date(data.date),
    quotes: data.quotes,
    refreshedAt: new Date(data.refreshed_at),
  }))

export type Quote = z.infer<typeof QuoteSchema>
