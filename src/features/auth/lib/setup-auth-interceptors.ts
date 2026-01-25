import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

import { api } from '@/shared/api/client'
import { postTokenRefresh } from '@/features/auth/api/endpoints/refresh'
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from '@/features/auth/model/store/token-store'

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

let refreshAccessTokenPromise: Promise<string> | null = null
let isInterceptorInstalled = false

export const setupAuthInterceptors = () => {
  if (isInterceptorInstalled) return
  isInterceptorInstalled = true

  api.interceptors.request.use((config) => {
    const token = getAccessToken()
    if (token) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const statusCode = error.response?.status
      const originalRequest = error.config as RetriableRequestConfig | undefined

      if (!originalRequest || statusCode !== 401) {
        throw error
      }

      if (originalRequest.url?.includes('/auth/refresh')) {
        clearAccessToken()
        throw error
      }

      if (originalRequest._retry) {
        throw error
      }
      originalRequest._retry = true

      try {
        if (!refreshAccessTokenPromise) {
          refreshAccessTokenPromise = postTokenRefresh()
            .then((refreshResponse) => {
              setAccessToken(refreshResponse.accessToken)
              return refreshResponse.accessToken
            })
            .finally(() => {
              refreshAccessTokenPromise = null
            })
        }

        const newAccessToken = await refreshAccessTokenPromise

        originalRequest.headers = originalRequest.headers ?? {}
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return api(originalRequest)
      } catch (refreshError) {
        clearAccessToken()
        throw refreshError
      }
    }
  )
}
