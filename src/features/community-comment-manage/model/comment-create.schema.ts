import z from 'zod'

const MAX_CONTENT_LENGTH = 500

// 작성 요청
export const CommentCreateFormSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, '내용을 입력해주세요.')
    .max(MAX_CONTENT_LENGTH, `${MAX_CONTENT_LENGTH}자 이내로 입력해주세요.`),
})

export type CommentCreateForm = z.infer<typeof CommentCreateFormSchema>

// 작성 응답: 엔티티의 Comment 사용
