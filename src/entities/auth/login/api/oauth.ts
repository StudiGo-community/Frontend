import axios from 'axios'
import {
  KakaoOAuthRequestSchema,
  KakaoOAuthResponse,
  KakaoOAuthResponseSchema,
} from '../model/oauth-schema'

export const postKakaoOAuth = async (input: {
  authorization_code: string
  redirect_uri: string
}): Promise<KakaoOAuthResponse> => {
  const body = KakaoOAuthRequestSchema.parse(input)

  const { data } = await axios.post('/auth/oauth/kakao', body, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  })

  return KakaoOAuthResponseSchema.parse(data)
}
