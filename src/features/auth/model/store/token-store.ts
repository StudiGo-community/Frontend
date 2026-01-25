const TOKEN_STORAGE_KEY = 'studigo_access_token'

let accessToken: string | null = null

const initializeToken = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (stored) {
      accessToken = stored
    }
  }
}

export const setAccessToken = (token: string) => {
  accessToken = token
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
  }
}

export const getAccessToken = () => {
  if (accessToken === null) {
    initializeToken()
  }
  return accessToken
}

export const clearAccessToken = () => {
  accessToken = null
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
  }
}
