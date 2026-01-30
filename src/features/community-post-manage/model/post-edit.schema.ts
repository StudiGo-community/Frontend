import z from 'zod'
import {
  PostFormBaseSchema,
  PostResponseBaseRawSchema,
} from '@/features/community-post-manage/model/base.schema'

// 요청
// TODO: images가 있어야 하는거 아닌지 확인 후 요청 (포함하기로 하면 omit 필요없음)
export const PostEditFormSchema = PostFormBaseSchema.omit({
  images: true,
}).partial()

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
