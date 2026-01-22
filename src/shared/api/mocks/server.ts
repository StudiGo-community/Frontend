import { setupServer } from 'msw/node'
import { handlers } from '@/shared/api/mocks/handlers'

const server = setupServer(...handlers)

if (
  process.env.NEXT_RUNTIME === 'nodejs' &&
  process.env.NODE_ENV === 'development'
) {
  server.listen({ onUnhandledRequest: 'bypass' })
}
