import { z } from 'zod'
import { PaginationSchema } from '@/entities/mypage/model/common-schema'

export const MyCommentSchema = z.object({
  id: z.number(),
  content: z.string(),
  createdAt: z.string(),

  is_deleted: z.boolean().optional(),

  postId: z.number().nullable().optional(),
  postTitle: z.string().nullable().optional(),
})

export const GetMyCommentsResponseSchema = z.object({
  comments: z.array(MyCommentSchema),
  pagination: PaginationSchema,
})

export type MyComment = z.infer<typeof MyCommentSchema>
export type GetMyCommentsResponse = z.infer<typeof GetMyCommentsResponseSchema>

export const DeleteMyCommentsResponseSchema = z.unknown()
export type DeleteMyCommentsResponse = z.infer<
  typeof DeleteMyCommentsResponseSchema
>
