import { useTokenStore } from '@/entities/session/store/token-store'
import { useSessionStore } from '@/entities/session/store/session-store'

export const clearAuthClientState = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('studigo_access_token')
    sessionStorage.removeItem('studigo_session_user')
  }

  useTokenStore.getState().clearAccessToken()
  useSessionStore.getState().clearUser()

  // TODO: refresh token을 localStorage에 저장하게 되면 여기서 같이 삭제
}
