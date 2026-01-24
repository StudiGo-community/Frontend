import { z } from 'zod'

export const postSchema = z.object({
  boardId: z.string().min(1, '게시판을 선택해 주세요.'),
  title: z.string().min(1, '제목을 입력해 주세요.'),
  content: z.string().min(1, '내용을 입력해 주세요.'),
  tags: z.array(z.string()).default([]),
})

export type PostFormData = z.infer<typeof postSchema>
