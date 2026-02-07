import { cache } from 'react'
import { cookies } from 'next/headers'
import { isAxiosError } from 'axios'
import { api } from '@/shared/api/client'
import type { User } from '@/shared/model/user'
import { UserResponseSchema } from '@/shared/model/user.schema'
import { handleActionError } from '@/shared/api/handleActionError'

// TODO: adapter: fetch 가게되면 캐싱 방법 변경 (현재 React.cache 사용)
export const getUser = cache(async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies()
    const response = await api.get('/me/profile', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    })
    return UserResponseSchema.parse(response.data.user)
  } catch (error) {
    // 인터셉터가 토큰 갱신을 시도한 후에도 실패한 경우에만 이곳에 도달.
    // 401은 null 반환 주의하세요!
    if (isAxiosError(error) && error.response?.status === 401) {
      return null
    }

    return handleActionError(error, '유저 정보를 불러오는데 실패했습니다.')
  }
})

// 프로필 조회는 마이페이지가 외에도 사용되어서 shared에 두었어요.
