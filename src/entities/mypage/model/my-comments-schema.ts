import { z } from 'zod'
import { PaginationSchema } from '@/entities/mypage/model/common-schema'

export const MyCommentSchema = z
  .object({
    id: z.number(),
    content: z.string().nullable().optional(),

    createdAt: z.string().optional(),
    created_at: z.string().optional(),

    is_deleted: z.boolean().optional(),

    postId: z.number().nullable().optional(),
    post_id: z.number().nullable().optional(),

    postTitle: z.string().nullable().optional(),
    post_title: z.string().nullable().optional(),
  })
  .transform((v) => {
    return {
      id: v.id,
      content: v.content ?? null,
      createdAt: v.createdAt ?? v.created_at ?? '',
      is_deleted: v.is_deleted,
      postId: v.postId ?? v.post_id ?? null,
      postTitle: v.postTitle ?? v.post_title ?? null,
    }
  })

const GetMyCommentsInnerSchema = z.object({
  comments: z.array(MyCommentSchema),
  pagination: PaginationSchema,
})

export const GetMyCommentsResponseSchema = z
  .union([
    GetMyCommentsInnerSchema,
    z.object({
      data: GetMyCommentsInnerSchema,
    }),
  ])
  .transform((v) => {
    if ('data' in v) return v.data
    return v
  })

export type MyComment = z.infer<typeof MyCommentSchema>
export type GetMyCommentsResponse = z.infer<typeof GetMyCommentsResponseSchema>

export const DeleteMyCommentsResponseSchema = z.unknown()
export type DeleteMyCommentsResponse = z.infer<
  typeof DeleteMyCommentsResponseSchema
>
