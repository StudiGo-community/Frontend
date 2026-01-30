import z from 'zod'
import { AuthorSchema } from '@/entities/post/model/author.schema'
import {
  PostFormBaseSchema,
  PostResponseBaseRawSchema,
} from '@/features/community-post-management/model/base.schema'
import { POST_STATUS } from '@/entities/post/model/constants'

// 요청
export const PostCreateFormSchema = PostFormBaseSchema

export type PostCreateForm = z.infer<typeof PostCreateFormSchema>

// 응답
export const PostCreateResponseSchema = PostResponseBaseRawSchema.extend({
  author: AuthorSchema,
  like_count: z.number().int().nonnegative(),
  comment_count: z.number().int().nonnegative(),
  created_at: z.string(),
  status: z.enum(POST_STATUS),
}).transform((post) => ({
  id: post.id,
  author: post.author,
  title: post.title,
  content: post.content,
  category: post.category,
  status: post.status,
  thumbnailUrl: post.thumbnail_url,
  images: post.images,
  likeCount: post.like_count,
  commentCount: post.comment_count,
  createdAt: new Date(post.created_at),
}))

export type PostCreateResponse = z.infer<typeof PostCreateResponseSchema>
