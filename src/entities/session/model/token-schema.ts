import z from 'zod'

export const TokenResponseSchema = z
  .object({
    access_token: z.string(),
    token_type: z.string(),
    expires_in: z.number().int().positive(),
  })
  .transform((data) => ({
    accessToken: data.access_token,
    tokenType: data.token_type,
    expiresIn: data.expires_in,
  }))

export type TokenResponse = z.infer<typeof TokenResponseSchema>
