import { http, HttpResponse, passthrough } from 'msw'
// import { communityHandlers } from '@/shared/api/mocks/handlers/community-handlers'
import { chatHandlers } from '@/shared/api/mocks/handlers/chat-handlers'
// import { mypageHandlers } from '@/shared/api/mocks/handlers/mypage-handlers'
// import { authHandlers } from '@/shared/api/mocks/handlers/auth-handlers'

const handlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/health-check`, () => {
    return HttpResponse.json({ message: 'Hello!' })
  }),

  http.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, () =>
    passthrough()
  ),
  http.post('/api/auth/logout', () => passthrough()),

  // ...communityHandlers,
  ...chatHandlers,
  // ...mypageHandlers,
  // ...authHandlers,
]

export { handlers }
