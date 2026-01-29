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
    author: {
      id: comment.author.id,
      nickname: comment.author.nickname,
      profileImageUrl: comment.author.profile_image_url,
    },
    content: comment.content,
    taggedNicknames: comment.tagged_nicknames,
    createdAt: new Date(comment.created_at),
  }))

export type Comment = z.infer<typeof CommentSchema>
