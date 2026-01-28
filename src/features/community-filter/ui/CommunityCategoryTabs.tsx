import Link from 'next/link'
import { cn } from '@/shared/lib/cn'
import { createUrl } from '@/shared/lib/url'

// TODO: 명세서 나오는거 보고 value 수정 & constans로 옮기기
const CATEGORIES = [
  { label: '전체', value: 'all' },
  { label: '자유', value: 'free' },
  { label: '모집', value: 'recruit' },
  { label: '학습', value: 'study' },
] as const

interface CommunityCategoryTabsProps {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function CommunityCategoryTabs({
  searchParams,
}: CommunityCategoryTabsProps) {
  const activeCategory = (searchParams.category as string) ?? 'all'

  return (
    <nav className="flex gap-8">
      {CATEGORIES.map((category) => (
        <Link
          key={category.value}
          href={createUrl('', searchParams, {
            category: category.value,
            page: 1,
          })}
          className={cn(
            'relative pb-3 text-lg font-bold transition-all',
            activeCategory === category.value
              ? 'text-brand-black border-brand-black border-b-4'
              : 'text-brand-gray-300 hover:text-brand-gray-400'
          )}
        >
          {category.label}
        </Link>
      ))}
    </nav>
  )
}
