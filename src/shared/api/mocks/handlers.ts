import { http, HttpResponse } from 'msw'

const handlers = [
  http.get('http://localhost:3000/health-check', () => {
    return HttpResponse.json({ message: 'Hello!' })
  }),
]

export { handlers }
