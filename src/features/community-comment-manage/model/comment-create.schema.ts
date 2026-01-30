import z from 'zod'

// 작성 요청
export const CommentCreateFormSchema = z.object({
  content: z.string().min(1, '내용을 입력해주세요.'),
})

export type CommentCreateForm = z.infer<typeof CommentCreateFormSchema>

// 작성 응답: 엔티티의 Comment 사용
