import { useTokenStore } from '@/entities/session/store/token-store'
import { useSessionStore } from '@/entities/session/store/session-store'
import type { ApplyLoginPayload } from '@/entities/session/model/types'

export function applyLoginSession(payload: ApplyLoginPayload) {
  useTokenStore.getState().setAccessToken(payload.accessToken)
  useSessionStore.getState().setUser(payload.user)
}
