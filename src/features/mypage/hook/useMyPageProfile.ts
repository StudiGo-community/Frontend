import { useMemo } from 'react'

type UserLike = {
  nickname?: string | null
  email?: string | null
  profileImageUrl?: string | null
} | null

export function useMyPageProfile(user: UserLike) {
  const profile = useMemo(() => {
    return {
      nickname: user?.nickname ?? '',
      email: user?.email ?? '',
      joinedAt: '-',
      profileImageSrc: user?.profileImageUrl ?? null,
      balloonLeft: {
        title: '오늘도 힘내봐요!',
        subtitle: 'Hazlo lo mejor que puedas hoy también',
      },
      balloonRight: { title: 'STUDY GO !' },
    }
  }, [user?.email, user?.nickname, user?.profileImageUrl])

  return { profile }
}
