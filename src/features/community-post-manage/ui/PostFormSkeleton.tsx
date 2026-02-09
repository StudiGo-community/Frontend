import { Skeleton } from '@/shared/ui/Skeleton'

export default function PostFormSkeleton() {
  return (
    <div className="flex flex-col gap-6 pt-10">
      {/* 카테고리 */}
      <div className="w-1/3 min-w-[200px]">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* 제목 */}
      <Skeleton className="h-14 w-full rounded-none" />

      {/* 콘텐츠 툴바 */}
      <div className="flex gap-2 border-b py-2">
        <Skeleton className="size-8 rounded" />
        <Skeleton className="size-8 rounded" />
        <Skeleton className="size-8 rounded" />
        <Skeleton className="size-8 rounded" />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-64 w-full rounded-md" />
      </div>

      {/* 하단 액션 */}
      <div className="fixed right-0 bottom-0 left-0 border-t bg-white p-4">
        <div className="container mx-auto flex justify-end gap-2">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
      </div>
    </div>
  )
}
