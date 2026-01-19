'use client'

import { cn } from '@/shared/lib/cn'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'
import { Plus, ArrowUpNarrowWide, ArrowDownWideNarrow } from 'lucide-react'

const COMMUNITY_TABS = ['전체', '자유', '모집', '학습'] as const

interface CommunityFiltersProps {
  activeTab: string
  onTabChange: (tab: string) => void
  searchQuery: string
  onSearchChange: (value: string) => void
  sortBy: 'popular' | 'latest'
  onSortByChange: (val: 'popular' | 'latest') => void
  sortOrder: 'asc' | 'desc'
  onSortOrderChange: (order: 'asc' | 'desc') => void
}

export default function CommunityFilters({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
}: CommunityFiltersProps) {
  const toggleSort = () => {
    onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="border-brand-gray-100 flex items-end justify-between border-b">
        <nav className="flex gap-8">
          {COMMUNITY_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={cn(
                'relative pb-4 text-lg font-bold transition-all',
                activeTab === tab
                  ? 'text-brand-black'
                  : 'text-brand-gray-300 hover:text-brand-gray-400'
              )}
            >
              {tab}
              {activeTab === tab && (
                <div className="bg-brand-black absolute right-0 bottom-0 left-0 h-1" />
              )}
            </button>
          ))}
        </nav>

        <Button
          size="sm"
          className="bg-brand-black mb-3 flex items-center gap-2 px-4 py-2 font-bold text-white hover:bg-black/80"
        >
          <Plus size={18} />
          게시글 작성
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {['popular', 'latest'].map((type) => (
            <button
              key={type}
              onClick={() => onSortByChange(type as 'popular' | 'latest')}
              className={cn(
                'rounded-full border px-4 py-1.5 text-xs font-bold transition-all',
                sortBy === type
                  ? 'border-brand-main text-brand-main bg-brand-main/5'
                  : 'border-brand-gray-200 text-brand-gray-400'
              )}
            >
              {type === 'popular' ? '인기순' : '최신순'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSort}
            title={
              sortOrder === 'desc' ? '내림차순 (최신순)' : '오름차순 (오래된순)'
            }
            className="rounded-brand-base bg-brand-white hover:border-brand-main text-brand-gray-300 hover:text-brand-main flex h-10 w-10 items-center justify-center border border-transparent transition-all"
          >
            {sortOrder === 'desc' ? (
              <ArrowDownWideNarrow size={24} />
            ) : (
              <ArrowUpNarrowWide size={24} />
            )}
          </button>
          <div className="w-72">
            <Input
              type="search"
              size="sm"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="검색어를 입력하세요"
              className="hover:border-brand-main text-brand-gray-300 hover:text-brand-main"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
