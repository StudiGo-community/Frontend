import { z } from 'zod'
import { PaginationSchema } from '@/entities/mypage/model/common-schema'

export const MyPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: z.string(),
  is_deleted: z.boolean().optional(),
})

export const GetMyPostsResponseSchema = z.object({
  posts: z.array(MyPostSchema),
  pagination: PaginationSchema,
  message: z.string().optional(),
})

export type MyPost = z.infer<typeof MyPostSchema>
export type GetMyPostsResponse = z.infer<typeof GetMyPostsResponseSchema>

export const DeleteMyPostsResponseSchema = z.unknown()
export type DeleteMyPostsResponse = z.infer<typeof DeleteMyPostsResponseSchema>
