import z from 'zod'
import { AuthorSchema } from '@/entities/post/model/author.schema'

// 베이스
const CommentBaseSchema = z.object({
  id: z.number().int().positive(),
  post_id: z.number().int().positive().optional(),
  author: AuthorSchema,
  content: z.string(),
  tagged_nicknames: z.array(z.string()).optional(),
  created_at: z.string(),
})

// 상세
export const CommentSchema = CommentBaseSchema.transform((comment) => ({
  id: comment.id,
  postId: comment.post_id,
  author: comment.author,
  content: comment.content,
  taggedNicknames: comment.tagged_nicknames,
  createdAt: new Date(comment.created_at),
}))

export type Comment = z.infer<typeof CommentSchema>

// 목록의 단일
export const CommentListItemSchema = CommentBaseSchema.omit({
  post_id: true,
  tagged_nicknames: true,
}).transform((comment) => ({
  id: comment.id,
  author: comment.author,
  content: comment.content,
  createdAt: new Date(comment.created_at),
}))

export type CommentListItem = z.infer<typeof CommentListItemSchema>

// 목록
export const CommentListSchema = z
  .object({
    comments: z.array(CommentListItemSchema),
    pagination: z.object({
      page: z.number().int().nonnegative(),
      size: z.number().int().nonnegative(),
      total_count: z.number().int().nonnegative(),
      total_pages: z.number().int().nonnegative(),
      has_next: z.boolean(),
    }),
  })
  .transform((commentList) => ({
    comments: commentList.comments,
    pagination: {
      page: commentList.pagination.page,
      size: commentList.pagination.size,
      totalCount: commentList.pagination.total_count,
      totalPages: commentList.pagination.total_pages,
      hasNext: commentList.pagination.has_next,
    },
  }))

export type CommentList = z.infer<typeof CommentListSchema>
