// 'use client'
// TODO: nuqs 를 쓰게 되면 다시 클라이언트 컴포넌트로

import Link from 'next/link'
import { Plus } from 'lucide-react'
import CommunityCategoryTabs from '@/features/community-filter/ui/CommunityCategoryTabs'
import CommunitySortButtons from '@/features/community-filter/ui/CommunitySortButtons'
import CommunitySearchForm from '@/features/community-filter/ui/CommunitySearchForm'

// TODO: searchParams 타입 정의
interface CommunityFiltersProps {
  searchParams: Record<string, string | string[] | undefined>
}

export default function CommunityBoardFilters({
  searchParams,
}: CommunityFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* 윗줄 */}
      <div className="border-brand-gray-100 flex items-end justify-between border-b-2">
        {/* 카테고리 */}
        <CommunityCategoryTabs searchParams={searchParams} />

        {/* 게시글 작성 버튼 */}
        <Link
          href={'/community/write'}
          className="bg-brand-black mb-2 flex items-center gap-2 rounded-lg px-6 py-3 text-base font-bold text-white hover:bg-black/80"
        >
          <Plus size={18} />
          게시글 작성
        </Link>
      </div>

      {/* 아랫줄 */}
      <div className="flex items-center justify-between">
        {/* 정렬 */}
        <CommunitySortButtons searchParams={searchParams} />

        {/* 검색 */}
        {/* TODO: 검색 버튼 없애고 디바운스 넣거나 하려면 이젠 진짜 nuqs 쓰기 */}
        <CommunitySearchForm currentSearchParams={searchParams} />
      </div>
    </div>
  )
}
