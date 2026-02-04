import axios from 'axios'

export const api = axios.create({
  // 서버일 경우 백엔드랑 직접 통신, 클라이언트일 경우 next.config.mjs에서 설정한 프록시로 통신
  baseURL:
    typeof window === 'undefined'
      ? process.env.NEXT_PUBLIC_API_BASE_URL // 서버
      : '/api', // 클라이언트
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export const apiClient = api
