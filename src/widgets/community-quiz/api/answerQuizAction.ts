'use server'

import { handleActionError } from '@/shared/api/handleActionError'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { api } from '@/shared/api/client'
import { validateData } from '@/shared/lib/validateData'
import {
  QuizAnswerForm,
  QuizAnswerFormSchema,
  QuizAnswerResponse,
  QuizAnswerResponseSchema,
} from '@/entities/quiz/model/schema'

export const answerQuizAction = async (
  data: QuizAnswerForm
): Promise<QuizAnswerResponse> => {
  const validatedData = validateData(QuizAnswerFormSchema, data)
  const payload = {
    submitted_answer_text: validatedData.submittedAnswerText,
  }

  try {
    const cookieStore = await cookies()
    const response = await api.post(
      '/daily-questions/today/submission',
      payload,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    )

    revalidatePath('/community')

    return QuizAnswerResponseSchema.parse(response.data)
  } catch (error: unknown) {
    return handleActionError(error, '퀴즈 정답 제출에 실패했습니다.')
  }
}
