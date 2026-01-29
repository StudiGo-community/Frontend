import z from 'zod'

export const AuthorSchema = z.object({
  id: z.number().int().positive(),
  nickname: z.string(),
  profile_image_url: z.url(),
})

export const TransformedAuthorSchema = AuthorSchema.transform((author) => ({
  id: author.id,
  nickname: author.nickname,
  profileImageUrl: author.profile_image_url,
}))

export type Author = z.infer<typeof TransformedAuthorSchema>
