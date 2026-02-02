'use client'

import { cn } from '@/shared/lib/cn'
import { ButtonVariants } from '@/shared/ui/Button'
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

function ChatRoomSortButton() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sort = searchParams.get('sort')

  return (
    <div className="flex items-center gap-2 pb-1.5">
      {sort === 'asc' ? (
        <Link
          href={`${pathname}?sort=desc`}
          className={cn(ButtonVariants({ variant: 'secondary', size: 'sm' }))}
          aria-label="채팅방 마지막 채팅 시간 최신순으로 정렬하기"
          scroll={false}
        >
          <ArrowDownWideNarrow />
        </Link>
      ) : (
        <Link
          href={`${pathname}?sort=asc`}
          className={cn(ButtonVariants({ variant: 'secondary', size: 'sm' }))}
          aria-label="채팅방 마지막 채팅 시간 오래된 순으로 정렬하기"
          scroll={false}
        >
          <ArrowUpNarrowWide />
        </Link>
      )}
    </div>
  )
}

export default ChatRoomSortButton
