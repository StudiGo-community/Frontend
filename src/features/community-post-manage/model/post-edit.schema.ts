import z from 'zod'
import {
  PostFormBaseSchema,
  PostResponseBaseRawSchema,
} from '@/features/community-post-manage/model/base.schema'

// 요청
export const PostEditFormSchema = PostFormBaseSchema

export type PostEditForm = z.infer<typeof PostEditFormSchema>

// 응답
export const PostEditResponseSchema = PostResponseBaseRawSchema.extend({
  updated_at: z.string(),
}).transform((post) => ({
  id: post.id,
  title: post.title,
  content: post.content,
  category: post.category,
  images: post.images,
  thumbnailUrl: post.thumbnail_url,
  updatedAt: new Date(post.updated_at),
}))

export type PostEditResponse = z.infer<typeof PostEditResponseSchema>
