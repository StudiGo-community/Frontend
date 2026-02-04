import z from 'zod'
import { AuthorSchema } from '@/entities/post/model/author.schema'
import { CommentSchema } from '@/entities/post/model/comment.schema'
import {
  POST_CATEGORIES,
  URL_MAX_LENGTH,
} from '@/entities/post/model/constants'

// 파츠
// 이미지
export const ImageSchema = z.object({
  id: z.number().int().positive(),
  image_url: z.url().max(URL_MAX_LENGTH),
  sort_order: z.number().int().nonnegative(),
})

// 게시글 베이스
// id, title, category, author, thumbnail_url, images, like_count, comment_count, view_count, is_liked, updated_at
const PostBaseSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  category: z.enum(POST_CATEGORIES),
  author: AuthorSchema,
  thumbnail_url: z.url().max(URL_MAX_LENGTH).nullable(),
  images: z.array(ImageSchema),
  like_count: z.number().int().nonnegative(),
  comment_count: z.number().int().nonnegative(),
  view_count: z.number().int().nonnegative(),
  is_liked: z.boolean(),
  updated_at: z.string(),
})

// 조립
// 게시글 상세
// content, created_at, comments 추가
export const PostDetailSchema = PostBaseSchema.extend({
  content: z.string(),
  created_at: z.string(),
  comments: z.array(CommentSchema),
}).transform((post) => ({
  id: post.id,
  title: post.title,
  category: post.category,
  author: post.author,
  thumbnailUrl: post.thumbnail_url,
  images: post.images,
  likeCount: post.like_count,
  commentCount: post.comment_count,
  viewCount: post.view_count,
  isLiked: post.is_liked,
  updatedAt: new Date(post.updated_at),

  content: post.content,
  createdAt: new Date(post.created_at),
  comments: post.comments,
}))

export type PostDetail = z.infer<typeof PostDetailSchema>

// 목록의 단일 게시글
// content_preview, blinded_reason 추가
export const PostListItemSchema = PostBaseSchema.extend({
  content_preview: z.string(),
  blinded_reason: z.string().nullable(),
}).transform((post) => ({
  id: post.id,
  title: post.title,
  category: post.category,
  author: post.author,
  thumbnailUrl: post.thumbnail_url,
  images: post.images,
  viewCount: post.view_count,
  likeCount: post.like_count,
  commentCount: post.comment_count,
  isLiked: post.is_liked,
  updatedAt: new Date(post.updated_at),

  blindedReason: post.blinded_reason,
  contentPreview: post.content_preview,
}))

export type PostListItem = z.infer<typeof PostListItemSchema>

// 목록
export const PostListSchema = z.object({
  count: z.number().int().nonnegative(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  posts: z.array(PostListItemSchema),
})

export type PostList = z.infer<typeof PostListSchema>
