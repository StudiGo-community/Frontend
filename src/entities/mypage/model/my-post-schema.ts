import { z } from 'zod'
import { PaginationSchema } from '@/entities/mypage/model/common-schema'

export const MyPostSchema = z
  .object({
    id: z.number(),
    title: z.string(),

    category: z.string().optional(),

    thumbnailUrl: z.string().nullable().optional(),
    thumbnail_url: z.string().nullable().optional(),

    viewCount: z.number().int().nonnegative().optional(),
    view_count: z.number().int().nonnegative().optional(),

    likeCount: z.number().int().nonnegative().optional(),
    like_count: z.number().int().nonnegative().optional(),

    commentCount: z.number().int().nonnegative().optional(),
    comment_count: z.number().int().nonnegative().optional(),

    createdAt: z.string().optional(),
    created_at: z.string().optional(),
    is_deleted: z.boolean().optional(),
  })
  .transform((v) => {
    return {
      id: v.id,
      title: v.title,
      category: v.category,
      thumbnailUrl: v.thumbnailUrl ?? v.thumbnail_url ?? null,
      viewCount: v.viewCount ?? v.view_count ?? 0,
      likeCount: v.likeCount ?? v.like_count ?? 0,
      commentCount: v.commentCount ?? v.comment_count ?? 0,
      createdAt: v.createdAt ?? v.created_at ?? '',
      is_deleted: v.is_deleted,
    }
  })

const GetMyPostsInnerSchema = z.object({
  posts: z.array(MyPostSchema),
  pagination: PaginationSchema,
})

export const GetMyPostsResponseSchema = z
  .union([
    GetMyPostsInnerSchema.extend({ message: z.string().optional() }),
    z.object({
      data: GetMyPostsInnerSchema,
      message: z.string().optional(),
    }),
  ])
  .transform((v) => {
    if ('data' in v) return { ...v.data, message: v.message }
    return v
  })

export type MyPost = z.infer<typeof MyPostSchema>
export type GetMyPostsResponse = z.infer<typeof GetMyPostsResponseSchema>

export const DeleteMyPostsResponseSchema = z.unknown()
export type DeleteMyPostsResponse = z.infer<typeof DeleteMyPostsResponseSchema>
