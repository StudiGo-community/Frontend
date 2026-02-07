import { z } from 'zod'

export const validateData = <T>(schema: z.Schema<T>, data: unknown): T => {
  const parsed = schema.safeParse(data)

  if (!parsed.success) {
    const errorMessage = parsed.error.issues
      .map((issue) => issue.message)
      .join(' / ')
    throw new Error(errorMessage)
  }

  return parsed.data
}
