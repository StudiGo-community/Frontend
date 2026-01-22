const enableMocking = async () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const { worker } = await import('@/shared/api/mocks')
    worker.start({ onUnhandledRequest: 'bypass' })
  }
}

enableMocking()
