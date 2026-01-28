import Link from 'next/link'
import { cn } from '@/shared/lib/cn'
import { createUrl } from '@/shared/lib/url'

const SORT = [
  { label: '인기순', value: 'popular' },
  { label: '최신순', value: 'latest' },
  // { label: '오래된순', value: 'oldest' }, // 사용할 필요가..?
] as const

interface CommunitySortButtonsProps {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function CommunitySortButtons({
  searchParams,
}: CommunitySortButtonsProps) {
  const sortBy = (searchParams.sort as string) ?? 'popular'
  return (
    <div className="flex shrink-0 items-center gap-2">
      {SORT.map((type) => (
        <Link
          key={type.value}
          href={createUrl('', searchParams, {
            sort: type.value,
            page: 1,
          })}
          className={cn(
            'rounded-full border px-4 py-1.5 text-base font-bold transition-all',
            sortBy === type.value
              ? 'border-brand-main text-brand-main bg-brand-main/5'
              : 'border-brand-gray-200 text-brand-gray-400'
          )}
        >
          {type.label}
        </Link>
      ))}
    </div>
  )
}
