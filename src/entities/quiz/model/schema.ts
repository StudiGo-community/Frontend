import z from 'zod'

// 퀴즈

// 문장
export const QuoteSchema = z
  .object({
    date: z.string(),
    quotes: z.object({
      ko: z.string(),
      en: z.string(),
    }),
    refreshed_at: z.string(),
  })
  .transform((data) => ({
    date: new Date(data.date),
    quotes: {
      ko: data.quotes.ko,
      en: data.quotes.en,
    },
    refreshedAt: new Date(data.refreshed_at),
  }))

export type Quote = z.infer<typeof QuoteSchema>
