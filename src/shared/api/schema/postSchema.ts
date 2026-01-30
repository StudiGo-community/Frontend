import { z } from 'zod'

export const postSchema = z.object({
  // 명세서: TEST / Travel / Movie / Free (필수)
  category: z.enum(['TEST', 'Travel', 'Movie', 'Free'], {
    message: '카테고리를 선택해 주세요.',
  }),

  // 명세서: 게시글 제목 (1~100자, 필수)
  title: z
    .string()
    .min(1, '제목을 입력해 주세요.')
    .max(100, '제목은 100자 이내로 입력해 주세요.'),

  // 명세서: 게시글 내용 (1자 이상, 필수)
  content: z.string().min(1, '내용을 입력해 주세요.'),

  // 명세서: thumbnail_url (Nullable 가능)
  thumbnail_url: z.string().url().nullable().default(null),

  // 명세서: images (url, order 포함 배열)
  images: z
    .array(
      z.object({
        url: z.string().url(),
        order: z.number(),
      })
    )
    .default([]),
})

export type PostFormData = z.infer<typeof postSchema>
