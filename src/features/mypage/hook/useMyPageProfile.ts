import { useMemo } from 'react'

type UserLike = {
  nickname?: string | null
  email?: string | null
  profileImageUrl?: string | null
} | null

function normalizeImageSrcForNextImage(
  src: string | null | undefined
): string | null {
  if (!src) return null

  if (src.startsWith('http://localhost:3000/')) {
    return src.replace('http://localhost:3000', '')
  }

  if (src.startsWith('https://localhost:3000/')) {
    return src.replace('https://localhost:3000', '')
  }

  return src
}

export function useMyPageProfile(user: UserLike) {
  const profile = useMemo(() => {
    return {
      nickname: user?.nickname ?? '',
      email: user?.email ?? '',
      joinedAt: '-',
      profileImageSrc: normalizeImageSrcForNextImage(
        user?.profileImageUrl ?? null
      ),
      balloonLeft: {
        title: '오늘도 힘내봐요!',
        subtitle: 'Hazlo lo mejor que puedas hoy también',
      },
      balloonRight: { title: 'STUDY GO !' },
    }
  }, [user?.email, user?.nickname, user?.profileImageUrl])

  return { profile }
}
