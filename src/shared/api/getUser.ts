import { api } from '@/shared/api/client'
import type { User } from '@/shared/model/user'
import { UserResponseSchema } from '@/shared/model/user.schema'

export const getUser = async (): Promise<User> => {
  const response = await api.get('/me/profile')

  return UserResponseSchema.parse(response.data)
}

// 프로필 조회는 마이페이지가 외에도 사용되어서 shared에 두었어요.
