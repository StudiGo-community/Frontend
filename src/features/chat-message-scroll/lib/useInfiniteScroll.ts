import { type Message } from '@/entities/message/model/schema'
import { InfiniteQueryObserverResult } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

function useInfiniteScroll(
  messages: Message[] | undefined,
  isFetchingNextPage: boolean,
  hasNextPage: boolean,
  isEnabled: boolean,
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>
) {
  const containerRef = useRef<HTMLUListElement>(null)
  const prevScrollHeightRef = useRef<number>(0)

  useEffect(() => {
    if (!isEnabled) return

    const container = containerRef.current
    if (!container) return

    const lastMessage = container.lastElementChild
    if (!lastMessage) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        if (isFetchingNextPage || !hasNextPage || !isEnabled) return

        prevScrollHeightRef.current = container.scrollHeight
        fetchNextPage().then(() => {
          const prevScrollHeight = prevScrollHeightRef.current as number
          const curScrollHeight = container.scrollHeight
          const difference = Math.max(curScrollHeight - prevScrollHeight, 0)

          container.scrollTop += difference
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(lastMessage)
    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isEnabled, isFetchingNextPage, messages])

  return { containerRef }
}

export default useInfiniteScroll
