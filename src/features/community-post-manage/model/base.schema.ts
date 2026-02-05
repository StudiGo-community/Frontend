import z from 'zod'
import { ImageSchema } from '@/entities/post/model/post.schema'
import {
  POST_CATEGORIES,
  TITLE_MAX_LENGTH,
  URL_MAX_LENGTH,
} from '@/entities/post/model/constants'

// 폼 베이스
export const PostFormBaseSchema = z.object({
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
  // 백엔드 요청 스펙에 맞춰 url, order로 정의 (ImageSchema는 image_url, sort_order라 사용 불가)
  images: z
    .array(
      z.object({
        url: z.string().max(URL_MAX_LENGTH),
        order: z.number().int().nonnegative(),
      })
    )
    .optional(),
})

// 응답 베이스
export const PostResponseBaseRawSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  content: z.string(),
  category: z.enum(POST_CATEGORIES),
  images: z.array(ImageSchema),
  thumbnail_url: z.url().max(URL_MAX_LENGTH).nullable(),
})
