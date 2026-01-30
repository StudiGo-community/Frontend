import z from 'zod'

// 응답
export const LikeToggleResponseSchema = z
  .object({
    post_id: z.number().int().positive(),
    liked: z.boolean(),
    like_count: z.number().int().nonnegative(),
  })
  .transform((post) => ({
    postId: post.post_id,
    liked: post.liked,
    likeCount: post.like_count,
  }))

export type LikeToggleResponse = z.infer<typeof LikeToggleResponseSchema>
