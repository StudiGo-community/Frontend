'use client'

import { useMutation } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { api } from '@/shared/api/client'
import { clearAuthClientState } from '@/entities/auth/logout/lib/clear-auth'

type LogoutOptions = {
  allDevices?: boolean
  redirectTo?: string
}

const isProtectedPath = (pathname?: string) =>
  pathname?.startsWith('/mypage') || pathname?.startsWith('/admin')

export const useLogoutMutation = () => {
  const pathname = usePathname()

  return useMutation({
    mutationFn: async (opts: LogoutOptions) => {
      return api.post(
        '/auth/logout',
        { all_devices: opts.allDevices ?? false },
        { withCredentials: true }
      )

      // TODO: API 연동 시 return api.post('/api/v1/auth/logout', { all_devices: opts.allDevices ?? false })
    },

    onSuccess: (_data, opts: LogoutOptions) => {
      clearAuthClientState()
      const fallback = isProtectedPath(pathname) ? '/login' : '/'
      const to = opts?.redirectTo ?? fallback
      window.location.replace(to)
    },
    onError: () => {
      alert('로그아웃에 실패했습니다. 다시 시도해 주세요.')
    },
  })
}
