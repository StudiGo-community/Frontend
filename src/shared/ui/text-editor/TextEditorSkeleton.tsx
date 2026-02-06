import { Skeleton } from '@/shared/ui/Skeleton'
import { cn } from '@/shared/lib/cn'

export function TextEditorSkeleton({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'border-brand-gray-200 w-full rounded-lg border-2 p-4',
        className
      )}
      {...props}
    >
      {/* MenuBar 스켈레톤 */}
      <div className="flex flex-wrap items-center gap-3 border-b-2 border-slate-100 pb-4">
        {/* 취소, 재실행 */}
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <div className="mx-2 h-8 w-px bg-slate-100" />

        {/* 스타일 제거 */}
        <Skeleton className="h-9 w-9 rounded-md" />
        <div className="mx-2 h-8 w-px bg-slate-100" />

        {/* 텍스트 스타일 */}
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={`text-style-${i}`} className="h-9 w-9 rounded-md" />
        ))}
        <div className="mx-2 h-8 w-px bg-slate-100" />

        {/* 리스트 */}
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={`list-${i}`} className="h-9 w-9 rounded-md" />
        ))}
        <div className="mx-2 h-8 w-px bg-slate-100" />

        {/* 제목 */}
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={`heading-${i}`} className="h-9 w-9 rounded-md" />
        ))}
        <div className="mx-2 h-8 w-px bg-slate-100" />

        {/* 정렬 */}
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={`align-${i}`} className="h-9 w-9 rounded-md" />
        ))}
        <div className="mx-2 h-8 w-px bg-slate-100" />

        {/* 구분선 */}
        <Skeleton className="h-9 w-9 rounded-md" />
        <div className="mx-2 h-8 w-px bg-slate-100" />

        {/* 링크 */}
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={`link-${i}`} className="h-9 w-9 rounded-md" />
        ))}
      </div>

      {/* 에디터 컨텐츠 영역 */}
      <div className="min-h-140 w-full px-4 py-8">
        <p className="text-brand-gray-300">로딩 중...</p>
      </div>

      {/* WordCount 스켈레톤 */}
      <div className="flex items-center justify-end gap-2 p-2">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-4 w-20 rounded-md" />
      </div>
    </div>
  )
}
