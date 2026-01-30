import z from 'zod'
import { AuthorSchema } from '@/entities/post/model/author.schema'
import { CommentSchema } from '@/entities/post/model/comment.schema'
import {
  POST_CATEGORIES,
  URL_MAX_LENGTH,
} from '@/entities/post/model/constants'

// 베이스
// id, title, content, category, author, like_count, comment_count, is_liked, created_at, updated_at
// TODO: 목록의 단일 포스트에 view_count 추가해달라고 요청하기 (그리고 나면 상세에서 베이스로 옮기기)
const PostBaseSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  content: z.string(),
  category: z.enum(POST_CATEGORIES),
  author: AuthorSchema,
  like_count: z.number().int().nonnegative(),
  comment_count: z.number().int().nonnegative(),
  is_liked: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
})

// 이미지 파츠
export const ImageSchema = z.object({
  id: z.number().int().positive(),
  url: z.url().max(URL_MAX_LENGTH),
  order: z.number().int().nonnegative(),
})

// 조립
// 상세
// images, view_count, comments 추가
export const PostDetailSchema = PostBaseSchema.extend({
  images: z.array(ImageSchema),
  view_count: z.number().int().nonnegative(),
  comments: z.array(CommentSchema),
}).transform((post) => ({
  id: post.id,
  title: post.title,
  content: post.content,
  category: post.category,
  author: post.author,
  likeCount: post.like_count,
  commentCount: post.comment_count,
  isLiked: post.is_liked,
  createdAt: new Date(post.created_at),
  updatedAt: new Date(post.updated_at),
  images: post.images,
  viewCount: post.view_count,
  comments: post.comments,
}))

export type PostDetail = z.infer<typeof PostDetailSchema>

// 목록의 단일 포스트
export const PostListItemSchema = PostBaseSchema.extend({
  blinded_reason: z.string().nullable(), // 옵셔널이면 nullish로 바꾸기
  thumbnail_image: z.url().max(URL_MAX_LENGTH),
}).transform((post) => ({
  id: post.id,
  title: post.title,
  content: post.content,
  category: post.category,
  author: post.author,
  likeCount: post.like_count,
  commentCount: post.comment_count,
  isLiked: post.is_liked,
  createdAt: new Date(post.created_at),
  updatedAt: new Date(post.updated_at),
  blindedReason: post.blinded_reason,
  thumbnailImageUrl: post.thumbnail_image,
}))

// 목록
// blinded_reason, thumbnail_image 추가
export const PostListSchema = z.object({
  count: z.number().int().nonnegative(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  posts: z.array(PostListItemSchema),
})

export type PostList = z.infer<typeof PostListSchema>
