import axios from 'axios'
import { z } from 'zod'

const KakaoOAuthRequestSchema = z.object({
  authorization_code: z.string().min(1),
  redirect_uri: z.string().min(1),
})

const KakaoExistingUserResponseSchema = z.object({
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

const KakaoNewUserResponseSchema = z.object({
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

const KakaoOAuthResponseSchema = z.union([
  KakaoExistingUserResponseSchema,
  KakaoNewUserResponseSchema,
])

export type KakaoOAuthResponse = z.infer<typeof KakaoOAuthResponseSchema>

export const postKakaoOAuth = async (input: {
  authorization_code: string
  redirect_uri: string
}): Promise<KakaoOAuthResponse> => {
  const body = KakaoOAuthRequestSchema.parse(input)

  const { data } = await axios.post('/api/v1/auth/oauth/kakao', body, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  })

  return KakaoOAuthResponseSchema.parse(data)
}
