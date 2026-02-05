import Link from 'next/link'
import { cn } from '@/shared/lib/cn'
import { createUrl } from '@/shared/lib/url'
import {
  POST_CATEGORIES,
  POST_CATEGORY_LABELS,
} from '@/entities/post/model/constants'

const SHORT_LABELS: Record<(typeof POST_CATEGORIES)[number], string> = {
  FREE: '자유',
  RECRUIT: '모집',
  STUDY: '학습',
}

const CATEGORIES = [
  { label: '전체', value: 'ALL' },
  ...POST_CATEGORIES.map((category) => ({
    label: SHORT_LABELS[category] || POST_CATEGORY_LABELS[category],
    value: category,
  })),
] as const

interface CommunityCategoryTabsProps {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function CommunityCategoryTabs({
  searchParams,
}: CommunityCategoryTabsProps) {
  const activeCategory = (searchParams.category as string) ?? 'ALL'

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
