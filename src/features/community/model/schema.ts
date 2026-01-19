import z from 'zod'

export const QuizSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  prompt: z.string(),
})

export const QuizResponseSchema = z
  .object({
    question_date: z.string(),
    daily_question_id: z.number(),
    question: QuizSchema,
    expires_at: z.string(),
  })
  .transform((data) => ({
    questionDate: data.question_date,
    dailyQuestionId: data.daily_question_id,
    question: {
      id: data.question.id,
      title: data.question.title,
      description: data.question.description,
      prompt: data.question.prompt,
    },
    expiresAt: new Date(data.expires_at),
  }))

export type QuizResponse = z.infer<typeof QuizResponseSchema>
