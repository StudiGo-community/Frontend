import z from 'zod'
import { AuthorSchema } from '@/entities/post/model/author.schema'
import { ImageSchema } from '@/entities/post/model/post.schema'
import {
  POST_CATEGORIES,
  POST_STATUS,
  TITLE_MAX_LENGTH,
  URL_MAX_LENGTH,
} from '@/entities/post/model/constants'

// 요청
export const PostCreateFormSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .max(TITLE_MAX_LENGTH, `제목은 ${TITLE_MAX_LENGTH}자 이내로 입력해주세요.`),
  content: z.string().min(1, '내용을 입력해주세요.'),
  category: z.enum(POST_CATEGORIES, {
    message: '카테고리를 선택해주세요.',
  }),
  thumbnailUrl: z
    .url()
    .max(URL_MAX_LENGTH, `URL은 ${URL_MAX_LENGTH}자까지만 입력 가능합니다.`)
    .nullish(),
  images: z.array(ImageSchema.omit({ id: true })).optional(),
})

export type PostCreateForm = z.infer<typeof PostCreateFormSchema>

// 응답
export const PostCreateResponseSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  content: z.string(),
  category: z.enum(POST_CATEGORIES),
  author: AuthorSchema,
  images: z.array(ImageSchema),
  like_count: z.number().int().nonnegative(),
  comment_count: z.number().int().nonnegative(),
  created_at: z.string(),
  status: z.enum(POST_STATUS),
  thumbnail_url: z.url().max(URL_MAX_LENGTH).nullable(),
})

export type PostCreateResponse = z.infer<typeof PostCreateResponseSchema>
