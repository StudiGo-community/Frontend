'use client'

import { useEffect } from 'react'

const MswComponent = () => {
  useEffect(() => {
    const enableMocking = async () => {
      if (
        typeof window !== 'undefined' &&
        process.env.NODE_ENV === 'development'
      ) {
        const { worker } = await import('@/shared/api/mocks/browser')
        worker.start({ onUnhandledRequest: 'bypass' })
      }
    }

    enableMocking()
  }, [])

  return null
}

export { MswComponent }
