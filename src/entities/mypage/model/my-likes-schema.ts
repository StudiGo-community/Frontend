import { z } from 'zod'
import { PaginationSchema } from '@/entities/mypage/model/common-schema'

export const LikesSchema = z
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

    likedAt: z.string().optional(),
    liked_at: z.string().optional(),
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
      likedAt: v.likedAt ?? v.liked_at,
      createdAt: v.createdAt ?? v.created_at,
      is_deleted: v.is_deleted,
    }
  })

const GetLikesInnerSchema = z.object({
  posts: z.array(LikesSchema),
  pagination: PaginationSchema,
})

export const GetLikesResponseSchema = z
  .union([
    GetLikesInnerSchema,
    z.object({
      data: GetLikesInnerSchema,
    }),
  ])
  .transform((v) => {
    if ('data' in v) return v.data
    return v
  })

export type Likes = z.infer<typeof LikesSchema>
export type GetLikesResponse = z.infer<typeof GetLikesResponseSchema>
