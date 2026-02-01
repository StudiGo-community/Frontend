import { create } from 'zustand'

const TOKEN_STORAGE_KEY = 'studigo_access_token'

interface TokenStore {
  accessToken: string | null
  setAccessToken: (token: string | null) => void
  clearAccessToken: () => void
  initializeToken: () => void
}

function getInitialToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_STORAGE_KEY)
}

export const useTokenStore = create<TokenStore>((set) => ({
  accessToken: getInitialToken(),

  setAccessToken: (token) => {
    set({ accessToken: token })

    if (typeof window === 'undefined') return

    if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token)
    else localStorage.removeItem(TOKEN_STORAGE_KEY)
  },

  clearAccessToken: () => {
    set({ accessToken: null })
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
    }
  },

  initializeToken: () => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem(TOKEN_STORAGE_KEY)
    set({ accessToken: stored })
  },
}))
