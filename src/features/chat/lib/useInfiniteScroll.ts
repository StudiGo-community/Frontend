import { useEffect, useRef } from 'react'
import { type Message } from '@/features/chat/model/schema'

function useInfiniteScroll(
  messages: Message[] | undefined,
  isFetchingNextPage: boolean,
  hasNextPage: boolean,
  isEnabled: boolean,
  fetchNextPage: () => void
) {
  const containerRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!isEnabled) return
    if (!containerRef.current) return

    const lastMessage = containerRef.current.lastElementChild
    if (!lastMessage) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        if (isFetchingNextPage || !hasNextPage || !isEnabled) return
        fetchNextPage()
      },
      { threshold: 0.1 }
    )

    observer.observe(lastMessage)
    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isEnabled, isFetchingNextPage, messages])

  return { containerRef }
}

export default useInfiniteScroll
