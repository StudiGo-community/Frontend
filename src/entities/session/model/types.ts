export type SessionUser = {
  id: number
  email: string
  nickname: string
  name: string
  role: 'USER' | 'ADMIN'
  status: 'ACTIVE' | 'BANNED' | 'WITHDRAWN'
  provider?: 'EMAIL' | 'KAKAO' | 'GOOGLE'
  profileImageUrl: string | null
}

export type ApplyLoginPayload = {
  accessToken: string
  user: SessionUser
}
