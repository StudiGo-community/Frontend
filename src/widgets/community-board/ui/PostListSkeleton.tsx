import { Skeleton } from '@/shared/ui/Skeleton'

const POST_SKELETON_COUNT = 5

export default function PostListSkeleton() {
  return (
    <ul className="flex flex-col gap-4 border-b-2 pb-8">
      {[...Array(POST_SKELETON_COUNT)].map((_, i) => (
        <li
          key={i}
          className="flex items-center justify-between gap-6 rounded-lg px-2 py-4"
        >
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            {/* 상단: 프로필 이미지 + 닉네임 + 날짜 */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="ml-4 h-5 w-32" />
            </div>

            {/* 제목 */}
            <Skeleton className="h-7 w-3/4" />

            {/* 하단: 통계 아이콘들 */}
            <div className="flex gap-3">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>

          {/* 썸네일 */}
          <div>
            <Skeleton className="h-24 w-24 rounded-xl" />
          </div>
        </li>
      ))}
      {/* 페이지네이션 */}
      <div className="mb-16 flex justify-center py-4">
        <Skeleton className="h-8 w-64" />
      </div>
    </ul>
  )
}
