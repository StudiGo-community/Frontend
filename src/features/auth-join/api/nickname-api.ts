import { api } from '@/shared/api/client'

export interface CheckNicknameResponse {
  message: string
  check_token: string
  expires_in: number
}

export async function checkNickname(nickname: string) {
  const res = await api.post<CheckNicknameResponse>('/auth/check-nickname', {
    nickname,
  })
  return res.data
}
