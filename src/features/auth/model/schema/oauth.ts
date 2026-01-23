import { z } from 'zod'

export const KakaoOAuthRequestSchema = z.object({
  authorization_code: z.string().min(1),
  redirect_uri: z.string().min(1),
})

export const KakaoExistingUserResponseSchema = z.object({
  is_new_user: z.literal(false),
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string(),
  expires_in: z.number().int(),
  user: z.object({
    id: z.number().int(),
    email: z.string(),
    nickname: z.string(),
    profile_image_url: z.string().nullable().optional(),
    role: z.string(),
  }),
})

export const KakaoNewUserResponseSchema = z.object({
  is_new_user: z.literal(true),
  requires_additional_info: z.literal(true),
  temporary_token: z.string(),
  kakao_user_info: z.object({
    email: z.string(),
    nickname: z.string(),
    profile_image_url: z.string().nullable().optional(),
  }),
  missing_fields: z.array(z.string()),
})

export const KakaoOAuthResponseSchema = z.union([
  KakaoExistingUserResponseSchema,
  KakaoNewUserResponseSchema,
])

export type KakaoOAuthRequest = z.infer<typeof KakaoOAuthRequestSchema>
export type KakaoOAuthResponse = z.infer<typeof KakaoOAuthResponseSchema>
