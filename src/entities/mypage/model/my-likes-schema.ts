import { z } from 'zod'
import { PaginationSchema } from '@/entities/mypage/model/common-schema'

export const LikesSchema = z.object({
  id: z.number(),
  title: z.string(),
  likedAt: z.string().optional(),
  createdAt: z.string().optional(),
  is_deleted: z.boolean().optional(),
})

export const GetLikesResponseSchema = z.object({
  posts: z.array(LikesSchema),
  pagination: PaginationSchema,
})

export type Likes = z.infer<typeof LikesSchema>
export type GetLikesResponse = z.infer<typeof GetLikesResponseSchema>
