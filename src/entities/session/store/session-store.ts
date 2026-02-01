import { create } from 'zustand'
import type { SessionUser } from '@/entities/session/model/types'

const SESSION_USER_STORAGE_KEY = 'studigo_session_user'

function getInitialUser(): SessionUser | null {
  if (typeof window === 'undefined') return null

  const raw = sessionStorage.getItem(SESSION_USER_STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as SessionUser
  } catch {
    sessionStorage.removeItem(SESSION_USER_STORAGE_KEY)
    return null
  }
}

interface SessionStore {
  user: SessionUser | null
  setUser: (user: SessionUser | null) => void
  clearUser: () => void
  initializeUser: () => void
}

export const useSessionStore = create<SessionStore>((set) => ({
  user: getInitialUser(),

  setUser: (user) => {
    set({ user })

    if (typeof window === 'undefined') return

    if (user) {
      sessionStorage.setItem(SESSION_USER_STORAGE_KEY, JSON.stringify(user))
    } else {
      sessionStorage.removeItem(SESSION_USER_STORAGE_KEY)
    }
  },

  clearUser: () => {
    set({ user: null })
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(SESSION_USER_STORAGE_KEY)
    }
  },

  initializeUser: () => {
    if (typeof window === 'undefined') return
    const raw = sessionStorage.getItem(SESSION_USER_STORAGE_KEY)
    if (!raw) {
      set({ user: null })
      return
    }
    try {
      set({ user: JSON.parse(raw) as SessionUser })
    } catch {
      sessionStorage.removeItem(SESSION_USER_STORAGE_KEY)
      set({ user: null })
    }
  },
}))
