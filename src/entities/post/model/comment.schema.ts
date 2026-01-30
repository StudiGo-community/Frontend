import { AuthorSchema } from '@/entities/post/model/author.schema'
import z from 'zod'

export const CommentSchema = z
  .object({
    id: z.number().int().positive(),
    author: AuthorSchema,
    content: z.string(),
    tagged_nicknames: z.array(z.string()),
    created_at: z.string(),
  })
  .transform((comment) => ({
    id: comment.id,
    author: comment.author,
    content: comment.content,
    taggedNicknames: comment.tagged_nicknames,
    createdAt: new Date(comment.created_at),
  }))

export type Comment = z.infer<typeof CommentSchema>
