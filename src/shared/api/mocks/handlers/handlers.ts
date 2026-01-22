import { http, HttpResponse } from 'msw'
import { communityHandlers } from '@/shared/api/mocks/handlers/community-handlers'
import { chatHandlers } from '@/shared/api/mocks/handlers/chat-handlers'

const handlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/health-check`, () => {
    return HttpResponse.json({ message: 'Hello!' })
  }),
  ...communityHandlers,
  ...chatHandlers,
]

export { handlers }
