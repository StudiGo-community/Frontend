import { create } from 'zustand'
import type { SessionUser } from '@/entities/session/model/types'

interface SessionStore {
  user: SessionUser | null
  setUser: (user: SessionUser | null) => void
  clearUser: () => void
}

export const useSessionStore = create<SessionStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))
