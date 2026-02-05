import { Skeleton } from '@/shared/ui/Skeleton'

export default function CommunityPostSkeleton() {
  return (
    <>
      {/* 헤더 */}
      <section className="border-brand-gray-100 mt-4 space-y-4 border-b-2">
        {/* 제목, 드롭다운 */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        {/* 기타 정보 */}
        <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          {/* 작성자, 시간 */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          {/* 횟수: (조회수, 좋아요, 댓글) */}
          <div className="flex gap-4 self-end">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-12" />
          </div>
        </div>
      </section>

      {/* 본문 */}
      <section>
        {/* 내용 */}
        <div className="space-y-2 py-8">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>

        {/* 버튼: (좋아요, 신고하기), 댓글 수 */}
        <div className="flex items-end justify-between py-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-20 rounded-md" />
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>

          <Skeleton className="h-5 w-16" />
        </div>
      </section>
    </>
  )
}
