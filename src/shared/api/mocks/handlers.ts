import { http, HttpResponse } from 'msw'

const handlers = [
  http.get('/health-check', () => {
    return HttpResponse.json({ message: 'Hello!' })
  }),
]

export { handlers }
