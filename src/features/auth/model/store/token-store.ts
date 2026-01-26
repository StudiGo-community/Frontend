import { create } from 'zustand'

const TOKEN_STORAGE_KEY = 'studigo_access_token'

interface TokenStore {
  accessToken: string | null
  setAccessToken: (token: string) => void
  clearAccessToken: () => void
  initializeToken: () => void
}

export const useTokenStore = create<TokenStore>((set) => ({
  accessToken: null,
  setAccessToken: (token) => {
    set({ accessToken: token })
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_STORAGE_KEY, token)
    }
  },
  clearAccessToken: () => {
    set({ accessToken: null })
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
    }
  },
  initializeToken: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(TOKEN_STORAGE_KEY)
      if (stored) {
        set({ accessToken: stored })
      }
    }
  },
}))
