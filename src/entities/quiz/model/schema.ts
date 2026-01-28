import z from 'zod'

// ---------- 퀴즈 조회 ----------
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

// ---------- 퀴즈 제출 ----------
export const QuizSubmissionRequestSchema = z.object({
  submittedAnswerText: z.string(),
})

export type QuizSubmissionRequest = z.infer<typeof QuizSubmissionRequestSchema>

const QuizSubmissionSchema = z.object({
  id: z.number(),
  submitted_at: z.string(),
  is_correct: z.boolean(),
})

const AttendanceSchema = z.object({
  id: z.number(),
  created_date: z.string(),
  created_at: z.string(),
})

export const QuizSubmissionResponseSchema = z
  .object({
    date: z.string(),
    question_id: z.number(),
    submission: QuizSubmissionSchema,
    answer_test: z.string(),
    explanation: z.string(),
    attendance: AttendanceSchema,
  })
  .transform((data) => ({
    date: data.date,
    questionId: data.question_id,
    submission: {
      id: data.submission.id,
      submittedAt: data.submission.submitted_at,
      isCorrect: data.submission.is_correct,
    },
    answerTest: data.answer_test,
    explanation: data.explanation,
    attendance: {
      id: data.attendance.id,
      createdDate: data.attendance.created_date,
      createdAt: data.attendance.created_at,
    },
  }))

export type QuizSubmissionResponse = z.infer<
  typeof QuizSubmissionResponseSchema
>

// ---------- 퀴즈 결과 조회 ----------
export const QuizResultResponseSchema = z
  .object({
    question_date: z.string(),
    status: z.enum(['COMPLETED', 'PENDING']),
    daily_question_id: z.number(),
    question: QuizSchema,
    submission: QuizSubmissionSchema,
    explanation: z.string(),
  })
  .transform((data) => ({
    questionDate: data.question_date,
    status: data.status,
    dailyQuestionId: data.daily_question_id,
    question: {
      id: data.question.id,
      title: data.question.title,
      description: data.question.description,
      prompt: data.question.prompt,
    },
    submission: {
      id: data.submission.id,
      submittedAt: data.submission.submitted_at,
      isCorrect: data.submission.is_correct,
    },
    explanation: data.explanation,
  }))

export type QuizResultResponse = z.infer<typeof QuizResultResponseSchema>
