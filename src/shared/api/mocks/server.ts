import { setupServer } from 'msw/node'
import { handlers } from '@/shared/api/mocks/handlers'

const server = setupServer(...handlers)

export { server }
