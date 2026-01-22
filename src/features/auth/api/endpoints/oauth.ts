import axios from 'axios'
import {
  KakaoOAuthRequestSchema,
  KakaoOAuthResponseSchema,
  type KakaoOAuthResponse,
} from '@/features/auth/model/schema/oauth'

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
