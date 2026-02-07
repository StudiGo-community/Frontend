'use client'

import { useMutation } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { api } from '@/shared/api/client'
import { clearAuthClientState } from '@/entities/session/lib/clear-session'
import useChatCleanup from '@/entities/chat-room/model/useChatCleanup'
import useMessageCleanup from '@/entities/message/model/useMessageCleanup'
import { toast } from 'sonner'
import { useChatStore } from '@/entities/chat-room/model/store'

type LogoutOptions = {
  allDevices?: boolean
  redirectTo?: string
}

const isProtectedPath = (pathname?: string) =>
  pathname?.startsWith('/mypage') || pathname?.startsWith('/admin')

export const useLogoutMutation = () => {
  const pathname = usePathname()
  const enteredRoomId = useChatStore((state) => state.enteredRoomId)
  const { cleanup: cleanupChat } = useChatCleanup()
  const { cleanup: cleanupMessage } = useMessageCleanup()

  return useMutation({
    mutationFn: async (opts: LogoutOptions) => {
      return api.post(
        '/auth/logout',
        { all_devices: opts.allDevices ?? false },
        { withCredentials: true }
      )

      // TODO: API 연동 시 return api.post('/api/v1/auth/logout', { all_devices: opts.allDevices ?? false })
    },

    onSuccess: async (_data, opts: LogoutOptions) => {
      try {
        if (enteredRoomId) {
          cleanupMessage(enteredRoomId)
          await cleanupChat(enteredRoomId)
        }
      } catch (error) {
        console.error(`[Chat cleanup Error]\n${error}`)
      }
      clearAuthClientState()

      const fallback = isProtectedPath(pathname) ? '/login' : '/'
      const to = opts?.redirectTo ?? fallback
      window.location.replace(to)
    },
    onError: () => toast.error('로그아웃에 실패했습니다. 다시 시도해 주세요.'),
  })
}
