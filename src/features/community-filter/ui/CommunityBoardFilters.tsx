// 'use client'
// TODO: nuqs 를 쓰게 되면 다시 클라이언트 컴포넌트로

import Link from 'next/link'
import { cn } from '@/shared/lib/cn'
import { Input } from '@/shared/ui/input'
import { Plus } from 'lucide-react'

import { createUrl } from '@/shared/lib/url'

// TODO: 명세서 나오는거 보고 value 수정 & constans로 옮기기
const CATEGORIES = [
  { label: '전체', value: 'all' },
  { label: '자유', value: 'free' },
  { label: '모집', value: 'recruit' },
  { label: '학습', value: 'study' },
] as const

const SORT = [
  { label: '인기순', value: 'popular' },
  { label: '최신순', value: 'latest' },
  // { label: '오래된순', value: 'oldest' }, // 사용할 필요가..?
] as const

interface CommunityFiltersProps {
  activeCategory: string
  sortBy: 'popular' | 'latest'
  searchParams: Record<string, string | string[] | undefined>
}

export default function CommunityBoardFilters({
  activeCategory,
  sortBy,
  searchParams,
}: CommunityFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* 윗줄 */}
      <div className="border-brand-gray-100 flex items-end justify-between border-b-2">
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

        <Link
          href={'/write'}
          className="bg-brand-black mb-2 flex items-center gap-2 rounded-lg px-6 py-3 text-base font-bold text-white hover:bg-black/80"
        >
          <Plus size={18} />
          게시글 작성
        </Link>
      </div>

      {/* 아랫줄 */}
      <div className="flex items-center justify-between">
        {/* 정렬 */}
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

        {/* 검색 */}
        {/* TODO: 클라이언트 컴포넌트로 분리 (어차피 언컨트롤드 컴포넌트면 분리할 필요가 없긴 한데, 디바운스를 넣을건지, 디자인 의도 물어보기) */}
        <Input
          type="search"
          size="sm"
          // value={searchQuery}
          // onChange={(e) => onSearchChange(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="hover:border-brand-main text-brand-gray-300 hover:text-brand-main max-w-sm"
        />
      </div>
    </div>
  )
}
