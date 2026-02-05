import { Skeleton } from '@/shared/ui/Skeleton'

const COMMENT_SKELETON_COUNT = 3

export default function CommunityCommentsSkeleton() {
  return (
    <section className="mb-20">
      {/* 댓글 목록 */}
      <div className="flex flex-col">
        <ul className="border-brand-gray-100 flex flex-col gap-8 border-y-2 py-8">
          {[...Array(COMMENT_SKELETON_COUNT)].map((_, i) => (
            <li key={i} className="flex justify-between py-2">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-5 w-64" />
                  <Skeleton className="h-5 w-48" />
                </div>
                <Skeleton className="h-4 w-32" />
              </div>

              <div className="flex flex-col items-end justify-between">
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-center py-12">
          <Skeleton className="h-8 w-64" />
        </div>
      </div>

      {/* 댓글 작성 영역 */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-32 w-full rounded-md" />
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      </div>
    </section>
  )
}
