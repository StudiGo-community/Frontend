'use client'

import { Button } from '@/shared/ui/Button'
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

function ChatRoomFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const order = searchParams.get('order')

  const handleOrderAscending = () => router.push(`${pathname}?order=asc`)
  const handleOrderDescending = () => router.push(`${pathname}?order=desc`)

  return (
    <div className="flex items-center gap-2 pb-1.5">
      {order === 'asc' ? (
        <Button
          variant="secondary"
          size={'sm'}
          onClick={handleOrderDescending}
          aria-label="채팅방 마지막 채팅 시간 최신순으로 정렬하기"
        >
          <ArrowDownWideNarrow />
        </Button>
      ) : (
        <Button
          variant="secondary"
          size={'sm'}
          onClick={handleOrderAscending}
          aria-label="채팅방 마지막 채팅 시간 오래된 순으로 정렬하기"
        >
          <ArrowUpNarrowWide />
        </Button>
      )}
    </div>
  )
}

export default ChatRoomFilter
